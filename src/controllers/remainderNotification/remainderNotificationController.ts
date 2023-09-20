import { Employee } from "../../models";
//import{ReminderNotification} from "../../models"
import asyncHandler from "../../middleware/asyncHandler";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import sendEmail from "../../utils/sendEmail";
import mongoose from "mongoose";
import _ from "lodash";
import ReminderNotification from "../../models/ReminderNotification";
import launchcalendarvalidations from "../../models/launchcalendarvalidations";
import {
  totalAppraiserDetails,
  totalReviewerDetails,
  totalNormalizerDetails,
  totalAppraiserDetailsEmail,
  totalNormalizerDetailsEmail,
  totalReviewerDetailsEmail,
} from "../employee/employeeController";
//Update the reminder notification data
const ReminderNotificationFunction = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      reminderType,
      startDate,
      occurance,
      subject,
      content,
      reminderTimeline,
      sendMailTo,
    } = req.body;

    const employee = await ReminderNotification.updateOne(
      {
        reminderType: reminderType,
        reminderTimeline: reminderTimeline,
      },
      {
        $set: {
          startDate: startDate,
          occurance: occurance,
          subject: subject,
          content: content,
          nextRemainderDate: startDate,
          sendMailTo: sendMailTo,
        },
      },
      { upsert: true }
    );
    res.status(StatusCodes.OK).json({
      employee,
    });
  }
);
//Get the reminder notification data
const ReminderNotificationFunctionData = asyncHandler(
  async (req: Request, res: Response) => {
    const { type } = req.params;
    const data = await ReminderNotification.find({ reminderType: type });
    res.status(StatusCodes.OK).json({
      data,
    });
  }
);
//for starting and stoping daily tasks

// Define a variable to keep track of the task status
let isTaskRunning = false;

// Function to start the daily task
async function startDailyTask() {
  if (!isTaskRunning) {
    console.log("Starting daily task...");
    // Start your daily task here
    // Set isTaskRunning to true to indicate that the task is running
    isTaskRunning = true;
  }
}

// Function to stop the daily task
function stopDailyTask() {
  if (isTaskRunning) {
    console.log("Stopping daily task...");
    // Stop your daily task here
    // Set isTaskRunning to false to indicate that the task is stopped
    isTaskRunning = false;
  }
}

// Function to periodically check the reminderNotificationStatus
async function checkStatus() {
  try {
    const launchCalendarValidation = await launchcalendarvalidations.findOne(
      {}
    );
    if (launchCalendarValidation?.reminderNotificationStatus === true) {
      startDailyTask();
    } else {
      stopDailyTask();
    }
  } catch (error) {
    console.error("Error while checking status:", error);
  }

  // Check the status periodically, e.g., every minute
  setTimeout(checkStatus, 60 * 1000); // 60 seconds
}

// Start checking the status
checkStatus();

async function dailyTask() {
  console.log("This task runs every 24 hours.");
  const currentDate = new Date();
  const appraiserEmails = await totalAppraiserDetailsEmail();
  const reviewerEmails = await totalReviewerDetailsEmail();
  const normalizerEmails = await totalNormalizerDetailsEmail();
  // Find all reminder notifications of type "Appraiser" with a startDate after the current date
  const reminderNotifications = await ReminderNotification.find({
    // reminderType: "Appraiser",//not required
    nextRemainderDate: { $lt: currentDate },
  });
  if (reminderNotifications.length === 0) {
    console.log(
      "No reminder notifications with a startDate before today. Still there is time for reminder notifications."
    );
    return; // Exit the function if no notifications are found
  }
  console.log(reminderNotifications, "reminderNotifications");
  // Calculate updated startDate and remainderCount for notifications that meet the condition
  try {
    for (const reminder of reminderNotifications) {
      // if (reminder.nextRemainderDate > currentDate) {//date comparison ==
      //check reminder type.
      if (
        reminder.nextRemainderDate.getDate() === currentDate.getDate() &&
        reminder.nextRemainderDate.getMonth() === currentDate.getMonth() &&
        reminder.nextRemainderDate.getFullYear() === currentDate.getFullYear()
      ) {
        let emailsToSendData = [];

        // Determine which email lists to include
        if (reminder?.sendMailTo?.includes("Appraiser")) {
          emailsToSendData = emailsToSendData.concat(appraiserEmails);
        }
        if (reminder?.sendMailTo?.includes("Reviewer")) {
          emailsToSendData = emailsToSendData.concat(reviewerEmails);
        }
        if (reminder?.sendMailTo?.includes("Normalizer")) {
          emailsToSendData = emailsToSendData.concat(normalizerEmails);
        }
        // Remove duplicate email addresses, if any
        emailsToSendData = Array.from(new Set(emailsToSendData));
        //Email List

        // const emailsToSend = emailsToSendData.filter(async  (email) => {
          //sending email
          if (reminder) {
            await sendEmail({
              to: emailsToSendData, //emailtosend
              cc: [],
              subject: reminder.subject, // Use subject from ReminderNotification
              html: `<h4>${reminder.content}</h4>`, // Use content from ReminderNotification
            });
            console.log(`Email sent `);
          } else {
            console.error(
              `No valid reminder notification found for email `
            );
          }
        // });
        // Calculate new startDate based on occurance
        const newStartDate = new Date(reminder.nextRemainderDate);
        newStartDate.setDate(newStartDate.getDate() + reminder.occurance);

        // Update startDate and increment remainderCount
        await ReminderNotification.updateOne(
          { _id: reminder._id },
          {
            $set: {
              previousRemainderDate: reminder.nextRemainderDate,
              nextRemainderDate: newStartDate,
              remainderCount: reminder.remainderCount + 1,
            },
          }
        );
      }
    }
  } catch (error) {
    console.error(`Failed to send email : ${error.message}`);
  }
}

// Function to calculate the time until the next run (every 1 min).
// function calculateTimeUntilNextRun() {
//   const now = new Date();
//   const nextMinute = new Date(now);
//   nextMinute.setMinutes(now.getMinutes() + 1);
//   nextMinute.setSeconds(0);
//   const timeUntilNextRun = nextMinute.getTime() - now.getTime();
//   return timeUntilNextRun;
// }
// Function to calculate the time until the next run (every 24 hours).
function calculateTimeUntilNextRun() {
  const now = new Date();
  const nextRun = new Date(now);
  nextRun.setDate(nextRun.getDate() + 1); // Add 1 day to the current date
  nextRun.setHours(0, 0, 0, 0); // Set the time to midnight
  const timeUntilNextRun = nextRun.getTime() - now.getTime();
  return timeUntilNextRun;
}
// Function to start the daily task if reminderNotificationStatus is true
async function startDailyTaskIfStatusIsTrue() {
  const launchCalendarValidation = await launchcalendarvalidations.findOne({});
  if (launchCalendarValidation?.reminderNotificationStatus === true) {
    await dailyTask();
  }
}

// Function to periodically check the status and start/stop the task
async function checkStatusAndScheduleTask() {
  const launchCalendarValidation = await launchcalendarvalidations.findOne({});
  if (launchCalendarValidation?.reminderNotificationStatus === true) {
    // Start the initial run and schedule subsequent runs
    runDailyTask();
  } else {
    // Stop the task if status is false
    clearTimeout(dailyTaskTimeout);
  }
}

// Function to run the daily task and schedule it to run again every 24 hours.
let dailyTaskTimeout;

function runDailyTask() {
  dailyTaskTimeout = setTimeout(async () => {
    await startDailyTaskIfStatusIsTrue();
    runDailyTask();
  }, calculateTimeUntilNextRun());
}

// Start checking the status and scheduling the task
checkStatusAndScheduleTask();

export { ReminderNotificationFunction, ReminderNotificationFunctionData };
