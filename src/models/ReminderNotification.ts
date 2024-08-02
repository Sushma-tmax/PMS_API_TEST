import { model, Schema } from "mongoose";

const ReminderNotificationSchema = new Schema({
  reminderType: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  occurance: {
    type: Number,
  },
  subject: {
    type: String,
  },
  content: {
    type: String,
  },
  previousRemainderDate: {
    type: Date,
  },
  nextRemainderDate: {
    type: Date,
  },
  remainderCount: {
    type: Number,
    default:0
  },
  reminderTimeline: {
    type: String,
  },
  sendMailTo: {
   type:Array,
  },
  reminderLogs: {
    type:Array,
   },
  allLogsMessage: {
    type : Object,
  },
  status : [
    {
    status : [{
      type: String,
    }],  
    current_date : {
      type: String,
    },
    reminder_date : {
      type: String,
    },
  }
  ]
},  {timestamps: true});

export default model("ReminderNotification", ReminderNotificationSchema);
