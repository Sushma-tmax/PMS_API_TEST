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
import Calender from "../../models/Calender";
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

// Function to periodically check the reminderNotificationStatus(without endDate check)
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
// async function checkStatus() {
//   try {
//     const calenders = await Calender.find({ status: "Live" })
    
//     if (calenders.length > 0) {
//       const activeCalendar = calenders[0]; // Get the latest calendar
//       const currentDate = new Date();
//       //console.log(activeCalendar.end_date > currentDate,"calendersLIVE")
//       // Check if the current date is before the end_date of the latest calendar
//       if (activeCalendar.end_date > currentDate) {
//         const launchCalendarValidation = await launchcalendarvalidations.findOne({});
        
//         if (launchCalendarValidation?.reminderNotificationStatus === true) {
//           startDailyTask();
//         } else {
//           stopDailyTask();
//         }
//       } else {
//         // End date of the latest calendar has passed, stop the task
//         stopDailyTask();
//       }
//     } else {
//       // No live calendars found, stop the task
//       stopDailyTask();
//     }
//   } catch (error) {
//     console.error("Error while checking status:", error);
//   }
//   // Check the status periodically, e.g., every minute
//   setTimeout(checkStatus, 60 * 1000); // 60 seconds
// }

// Start checking the status
checkStatus();

async function dailyTask() {
  console.log("This task runs every 24 hours.");
  //Find today (without time)
  var currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  //Find emails
  const appraiserEmails = await totalAppraiserDetailsEmail();
  const reviewerEmails = await totalReviewerDetailsEmail();
  const normalizerEmails = await totalNormalizerDetailsEmail();

  //Find all employees whose pa status is pending with employee
  const allEmployees = await Employee.find({ 
    "employee_upload_flag": true , 
    "appraisal.pa_status" :/.*Pending with Employee.*/i
  },{
    "email":1
  }); 
  const allEmployeeEmails = allEmployees.map((employee) => employee.email)
  console.log(allEmployeeEmails, "allEmployeeEmails");

  // Find all reminder notifications where next reminder date is today
  const reminderNotifications = await ReminderNotification.find({
    // $expr: {
    //   $eq: [
    //     { $dateToString: { format: "%Y-%m-%d", date: "$nextReminderDate" } },
    //     { $dateToString: { format: "%Y-%m-%d", date: currentDate } }
    //   ]
    // }
  })
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
     let logMessage = "";
      //check reminder type.
      if (
        reminder?.nextRemainderDate?.getDate() === currentDate?.getDate() &&
        reminder?.nextRemainderDate?.getMonth() === currentDate?.getMonth() &&
        reminder?.nextRemainderDate?.getFullYear() ===
          currentDate?.getFullYear()
      ) {

        let emailsToSendData = [];
        let emailsToSend = [];
        // Determine which email lists to include
        if (reminder?.sendMailTo?.includes("Appraiser")) {
          emailsToSendData = emailsToSendData.concat(appraiserEmails);
          emailsToSend = emailsToSend.concat("Appraiser")
        }
        if (reminder?.sendMailTo?.includes("Reviewer")) {
          emailsToSendData = emailsToSendData.concat(reviewerEmails);
          emailsToSend = emailsToSend.concat("Reviewer")
        }
        if (reminder?.sendMailTo?.includes("Normalizer")) {
          emailsToSendData = emailsToSendData.concat(normalizerEmails);
          emailsToSend = emailsToSend.concat("Normalizer")
        }
        if (reminder?.sendMailTo?.includes("Employee")) {
          emailsToSendData = emailsToSendData.concat(allEmployeeEmails);
          emailsToSend = emailsToSend.concat("Employee")
        }
        // Remove duplicate email addresses and undefined values, if any
        emailsToSendData = Array.from(
          new Set(emailsToSendData.filter(Boolean))
        );
     
        //Email List
        console.log(emailsToSendData, "emailsToSendData");
      
        //sending email
        if (reminder) {
          // Update the reminderLog array with the current time and date
          //const updatedReminderLog = [...(reminder?.reminderLogs || []), { sentAt: new Date() }];

          // Update the reminder object with the new reminderLog
          //const updatedReminder = { ...reminder, reminderLogs: updatedReminderLog };
          await sendEmail({
            to: emailsToSendData, //emailtosend
            cc: [],
            subject: reminder?.subject , // Use subject from ReminderNotification
            html: reminder?.content, // Use content from ReminderNotification
          }).then((res)=>{
            logMessage += "Email sent"
          }).catch((res)=>{
            logMessage += `Failed to send email : ${res.message}`
          })
          //add the appended array
          console.log(`Email sent `);
        } else {
          console.error(`No valid reminder notification found for email `);
        }
        // Update the reminderLog array with the current time and date
        const updatedReminderLog = [
          ...(reminder?.reminderLogs || []),
           { sentAt: new Date(),sentTo: emailsToSendData,logMessage }
        ];
        // Update the reminder object with the new reminderLog
        // const updatedReminder = { ...reminder, reminderLogs: updatedReminderLog };
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
              reminderLogs:updatedReminderLog
            },
          }
        );
      }
    }
  } catch (error) {
    console.error(`Failed to send email : ${error.message}`);
    //add another log to application errors with func name,date,error msg and data(reminder for here)
  }
}
// Function to calculate the time until the next run (every 2 hour).
// function calculateTimeUntilNextRun() {
//   const now = new Date();
//   const nextHour = new Date(now);
//   nextHour.setMinutes(0); // Reset minutes to 0
//   nextHour.setSeconds(0); // Reset seconds to 0
//   nextHour.setMilliseconds(0); // Reset milliseconds to 0
//   nextHour.setHours(now.getHours() + 2); // Set hours to the next hour

//   const timeUntilNextHour = nextHour.getTime() - now.getTime();
//   return timeUntilNextHour;
// }
// Function to calculate the time until the next run (every 30 min).
// function calculateTimeUntilNextRun() {
//   const now = new Date();
//   const nextMinute = new Date(now);
//   nextMinute.setMinutes(now.getMinutes() + 30);
//   nextMinute.setSeconds(0);
//   const timeUntilNextRun = nextMinute.getTime() - now.getTime();
//   return timeUntilNextRun;
// }
// Function to calculate the time until the next run (every 2 min).
function calculateTimeUntilNextRun() {
  const now = new Date();
  const nextMinute = new Date(now);
  nextMinute.setMinutes(now.getMinutes() + 2);
  nextMinute.setSeconds(0);
  const timeUntilNextRun = nextMinute.getTime() - now.getTime();
  return timeUntilNextRun;
}
// Function to calculate the time until the next run (every 24 hours).
// function calculateTimeUntilNextRun() {
//   const now = new Date();
//   const nextRun = new Date(now);
//   nextRun.setDate(nextRun.getDate() + 1); // Add 1 day to the current date
//   nextRun.setHours(0, 0, 0, 0); // Set the time to midnight
//   const timeUntilNextRun = nextRun.getTime() - now.getTime();
//   return timeUntilNextRun;
// }
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
