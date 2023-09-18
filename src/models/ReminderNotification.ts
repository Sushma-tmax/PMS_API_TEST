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
},  {timestamps: true});

export default model("ReminderNotification", ReminderNotificationSchema);
