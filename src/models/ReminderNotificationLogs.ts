import { model, Schema } from "mongoose";

const ReminderNotificationLogsSchema = new Schema({  
      status: [String], // Ensure this is an array of strings
      current_date: String,
      reminder_date: String,
      task_details: String,
  
},  {timestamps: true});

export default model("ReminderNotificationLogs", ReminderNotificationLogsSchema);
