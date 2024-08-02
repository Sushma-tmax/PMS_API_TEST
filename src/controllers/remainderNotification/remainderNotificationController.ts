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
import ReminderNotificationLogs from "../../models/ReminderNotificationLogs";
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

    console.log(req.body, 'checkdates1')

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
let log_message_daily = {
  status: [],
  current_date: "",
  reminder_date: ''
};
let dailyLogEntry = []

// Function to start the daily task
async function startDailyTask() {
  if (!isTaskRunning) {
    console.log("Starting daily task...");
    // Start your daily task here
    // Set isTaskRunning to true to indicate that the task is running
    isTaskRunning = true;
    log_message_daily.status.push(`Starting daily task on ${new Date()}`);
  }
}

// Function to stop the daily task
function stopDailyTask() {
  if (isTaskRunning) {
    console.log("Stopping daily task...");
    // Stop your daily task here
    // Set isTaskRunning to false to indicate that the task is stopped
    isTaskRunning = false;
    log_message_daily.status.push(`Stopping daily task on ${new Date()}`);
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
  log_message_daily.status.push(`Task executed on ${new Date()}.`);
  //Find today (without time)
  var currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  //Find emails
  const appraiserEmails = await totalAppraiserDetailsEmail();
  const reviewerEmails = await totalReviewerDetailsEmail();
  const normalizerEmails = await totalNormalizerDetailsEmail();

  //Find all employees whose pa status is pending with employee
  const allEmployees = await Employee.find({
    "employee_upload_flag": true,
    "appraisal.pa_status": /.*Pending with Employee.*/i
  }, {
    "email": 1
  });
  const allEmployeeEmails = allEmployees.map((employee) => employee.email)
  console.log(allEmployeeEmails, "allEmployeeEmails");
  console.log(appraiserEmails, reviewerEmails, normalizerEmails, "allRoleEmails");

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
    log_message_daily.status.push(`No reminder notifications with a startDate before today. Still there is time for reminder notifications.`);
    console.log(
      "No reminder notifications with a startDate before today. Still there is time for reminder notifications."
    );
    await createStatusLog();
    return; // Exit the function if no notifications are found

  }

  console.log(reminderNotifications, "reminderNotifications");
  // Calculate updated startDate and remainderCount for notifications that meet the condition
  try {
    for (const reminder of reminderNotifications) {
      let AllLogs = [];
      let allLogsMessage = [];
      let logMessage = "";
      //check reminder type.
      console.log(reminder?.nextRemainderDate, reminder?.nextRemainderDate?.getDate(), currentDate?.getDate(),
        reminder?.nextRemainderDate?.getMonth(), currentDate?.getMonth(),
        reminder?.nextRemainderDate?.getFullYear(),
        currentDate?.getFullYear(), 'checkdates')
      log_message_daily.current_date = `date : ${currentDate?.getDate()} ; month :  ${currentDate?.getMonth()} ; year : ${currentDate?.getFullYear()}`;

      log_message_daily.reminder_date = `date : ${reminder?.nextRemainderDate?.getDate()} ; month :  ${reminder?.nextRemainderDate?.getMonth()} ; year : ${reminder?.nextRemainderDate?.getFullYear()}`;
      await createStatusLog();

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

        allLogsMessage.push(emailsToSendData);

        //sending email
        if (reminder) {
          // Update the reminderLog array with the current time and date
          //const updatedReminderLog = [...(reminder?.reminderLogs || []), { sentAt: new Date() }];

          // Update the reminder object with the new reminderLog
          //const updatedReminder = { ...reminder, reminderLogs: updatedReminderLog };         
          await sendEmail({
            // to: emailsToSendData, //emailtosend
            to: [emailsToSendData, "Pmstest2@taqeef.com"], //emailtosend
            cc: [],
            subject: reminder?.subject, // Use subject from ReminderNotification
            html: reminder?.content, // Use content from ReminderNotification
          }).then((res) => {
            logMessage += `Email sent at ${new Date()}`
            allLogsMessage.push(logMessage);
          }).catch((res) => {
            logMessage += `Failed to send email to recepients : ${res.message}`
            allLogsMessage.push(logMessage);
          })
          //add the appended array
          console.log(`Email sent `);
        } else {
          console.error(`No valid reminder notification found for email `);
        }
        // Update the reminderLog array with the current time and date
        const updatedReminderLog = [
          ...(reminder?.reminderLogs || []),
          { sentAt: new Date(), sentTo: emailsToSendData, logMessage }
        ];
        // Update the reminder object with the new reminderLog
        // const updatedReminder = { ...reminder, reminderLogs: updatedReminderLog };
        // });


        // Calculate new startDate based on occurance
        const newReminderDate = new Date(reminder?.nextRemainderDate);
        const newStartDate = new Date(newReminderDate.getTime() + newReminderDate.getTimezoneOffset() * 60000);
        newStartDate.setDate(newStartDate.getDate() + reminder.occurance);
        // const newStartDate = new Date(reminder.nextRemainderDate);
        // newStartDate.setDate(newStartDate.getDate() + reminder.occurance);

        allLogsMessage.push(newStartDate);
        AllLogs.push(allLogsMessage);


        // Update startDate and increment remainderCount
        await ReminderNotification.updateOne(
          { _id: reminder._id },
          {
            $set: {
              previousRemainderDate: reminder.nextRemainderDate,
              nextRemainderDate: newStartDate,
              remainderCount: reminder.remainderCount + 1,
              reminderLogs: updatedReminderLog,
            },
            $push: {
              allLogsMessage: {
                $each: AllLogs // Use $each if pushing multiple logs
              }
            }
          }
        );
      } else {
        console.log("Dates doesn't match")
      }
    }
  } catch (error) {
    console.error(`Failed to send email : ${error.message}`);
    //add another log to application errors with func name,date,error msg and data(reminder for here)
  }
}

// Function to calculate the time until the next run (every 1 hour).
// function calculateTimeUntilNextRun() {
//   const now = new Date();
//   const nextHour = new Date(now);
//   nextHour.setMinutes(0); // Reset minutes to 0
//   nextHour.setSeconds(0); // Reset seconds to 0
//   nextHour.setMilliseconds(0); // Reset milliseconds to 0
//   nextHour.setHours(now.getHours() + 1); // Set hours to the next hour

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
// Function to calculate the time until the next run (every day at 8 am).
function calculateTimeUntilNextRun() {
  const now = new Date();
  let nextRun = new Date(now);

  // Set the next run time to 8 am.
  //  set to run at 8 am according to UAE time
  nextRun.setHours(4, 0, 0, 0);

  // If the current time is already past 8 am, set the next run to the next day.
  if (now >= nextRun) {
    nextRun.setDate(now.getDate() + 1);
  }

  const timeUntilNextRun = nextRun.getTime() - now.getTime();
  return timeUntilNextRun;
}
//Function to calculate the time until the next run (every 2 min).
// function calculateTimeUntilNextRun() {
//   const now = new Date();
//   const nextMinute = new Date(now);
//   nextMinute.setMinutes(now.getMinutes() + 2);
//   nextMinute.setSeconds(0);
//   const timeUntilNextRun = nextMinute.getTime() - now.getTime();
//   return timeUntilNextRun;
// }
// // Function to calculate the time until the next run (every 24 hours).
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

async function createStatusLog() {
  try {
    console.log(log_message_daily, 'checklog_message_daily')
    dailyLogEntry.push(log_message_daily); // Append the current log message
    for (const logEntry of dailyLogEntry) {
      await ReminderNotificationLogs.create(logEntry);
      console.log("New status log created successfully for entry:", logEntry);
    }
    dailyLogEntry = []; // Reset the log entry array for the next cycle
  } catch (error) {
    console.error("Failed to create status log:", error.message);
  }
}


export { ReminderNotificationFunction, ReminderNotificationFunctionData };
