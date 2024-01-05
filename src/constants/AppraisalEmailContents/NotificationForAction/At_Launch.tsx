import { CLIENT_URL } from "../../URL"

// Notification action PA Initiation (for All)
const At_Launch = {
    // to: "Pmstest@taqeef.com",
    to: "[email]",
    subject: "[year] [calendar name] PA has been initiated for your actions ",
    html:
        `
        <div style="font-size: 14px; font-family: Arial; color:black;">
        <span>Dear Employee,</span><br>\<br>\

        <span>This is to inform you that the [year] [calendar name] performance appraisal process has been initiated.</span><br>\<br>\

        <span>The performance appraisal provides you with an opportunity to review and assess your progress and/or achievements over the past months/year.</span><br>\<br>\
       
        <span>Please note that the appraisal period is from <b>[initiation date]</b> to <b>[closing date]</b>, and will only include employees who have passed their probation period.
        </span><br>\<br>\

        <span>Hence, Appraisers are required to submit their team's performance appraisal by <b>[dd/mm/yy]</b>.</span><br>\<br>\

        <span>Please contact the Human Resources Team for assistance if you have any difficulties during the process or require further information.</span><br>\<br>\

        <span>To complete the performance appraisal process, please <a href = ${CLIENT_URL}>log in</a> to the system.</span><br>\<br>\

        <span>This is a system-generated email, please do not reply.</span><br>\<br>\

        <span>Regards,</span><br>\
        <span>Human Resources Team</span>
        </div>
        `
}

export {
    At_Launch,
}