import { CLIENT_URL } from "../../URL"

// Notification info Appraiser accepts Employee rejected PA (overall rating difference greater than 0.3) - (for Employee)
const APPRAISER_ACCEPTS_RATING_GREATER_INFO = {
    to: "[email]",
    subject: "[year] [calendar name] PA changes for [employee code]-[employee name] has been accepted by Appraiser after employee rejection",
    html:
    `
    <div style="font-size: 14px; font-family: Arial; color:black;">
    <span>Dear [Employee FirstName],</span><br>\<br>\
    <span>The changes made to the  [year] [calendar name] performance appraisal [employee code]-[employee name] have been accepted by [Appraiser name] and has been submitted for review and renormalization.</span><br>\<br>\
    <span>Please note that the overall rating for the performance appraisal has been changed from [previous rating] to [new rating] and requires approval from both the Reviewer and the HR Normalizer.</span><br>\<br>\
    <span>To view the performance appraisal details, please <a href = ${CLIENT_URL}>log in</a> to the system.</span><br>\<br>\
    <span>This is a system-generated email, please do not reply.</span><br>\<br>\
    <span>Regards,</span><br>\
    <span>Human Resources Team</span>
    </div>
    `      
}

// Notification info Appraiser accepts Employee rejected PA (overall rating difference up to 0.30 - (for Employee/Reviewer/Normalizer)
const APPRAISER_ACCEPTS_RATING_UPTO_INFO = {
    to: "[email]",
    subject: "[year] [calendar name] PA changes for [employee code]-[employee name] has been accepted by Appraiser after employee rejection",
    html:
    `
    <div style="font-size: 14px; font-family: Arial; color:black;">
    <span>Dear Employee,</span><br>\<br>\
    <span>The [year] [calendar name] performance appraisal for [employee code]-[employee name] has been accepted by [Appraiser name] and has been submitted for review.</span><br>\<br>\
    <span>Please note that the overall rating for the performance appraisal has been changed from [previous rating] to [new rating] and now requires the Reviewer approval.
    To view the performance appraisal details, please <a href = ${CLIENT_URL}>log in</a> to the system.</span><br>\<br>\
    <span>This is a system-generated email, please do not reply.</span><br>\<br>\
    <span>Regards,</span><br>\
    <span>Human Resources Team</span>
    </div>
    `      
}

export {
    APPRAISER_ACCEPTS_RATING_GREATER_INFO,
    APPRAISER_ACCEPTS_RATING_UPTO_INFO}