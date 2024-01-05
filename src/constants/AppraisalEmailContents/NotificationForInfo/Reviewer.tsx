import { CLIENT_URL } from "../../URL"

// Notification info after Reviewer accepts PA (for Appraiser)
const REVIEWER_ACCEPTS_PA_INFO = {
    to: "[email]",
    subject: "[year] [calendar name] PA for [employee code]-[employee name] has been accepted by Reviewer",
    html:
    `
    <div style="font-size: 14px; font-family: Arial; color:black;">
    <span>Dear [Appraiser FirstName],</span><br>\<br>\
    <span>The [year] [calendar name] performance appraisal for [employee code]-[employee name] has been <b>accepted</b> by [Reviewer name] and has now been submitted for normalization to [Normalizer name].</span><br>\<br>\
    <span>To view the details of the performance appraisal, please <a href = ${CLIENT_URL}>log in</a> to the system.</span> <br>\<br>\
    <span>This is a system-generated email, please do not reply.</span><br>\<br>\
    <span>Regards,</span><br>\
    <span>Human Resources Team</span>
    </div>
    `   
}


// Reviewer rejects PA - 3rd time (for Normalizer - one time)
const REVIEWER_REJECTS_PA_3RD_TIME_INFO = {
    to: "[email]",
    subject: "[year] [calendar name] PA for [employee code]-[employee name] has been rejected by Reviewer 3rd time",
    html:
    `
    <div style="font-size: 14px; font-family: Arial; color:black;">
    <span>Dear [Normalizer FirstName],</span><br>\<br>\
    <span>The [year] [calendar name] performance appraisal for [employee code]-[employee name] has been <b>rejected</b> by [Reviewer name] for the third (3) time.</span><br>\<br>\
    <span>To gain further clarification regarding the reasons for the rejection and any specific areas that require attention, we advise you to reach out to the Reviewer directly.</span><br>\<br>\
    <span>To view the performance appraisal, please <a href = ${CLIENT_URL}>log in</a> to the system.</span> <br>\<br>\
    <span>This is a system-generated email, please do not reply.</span><br>\<br>\
    <span>Regards,</span><br>\
    <span>Human Resources Team</span>
    </div>
    `   
}

// Notification info Reviewer accepts Employee rejected PA (overall rating is upto 0.3) (for Employee)
const REVIEWER_ACCEPTS_RATING_UPTO_INFO = {
    to: "[email]",
    subject: "[year] [calendar name] PA changes for [employee code]-[employee name] has been accepted by Reviewer",
    html:
    `
    <div style="font-size: 14px; font-family: Arial; color:black;">
    <span>Dear Employee,</span><br>\<br>\    
    <span>The changes made to the [year] [calendar name] performance appraisal for [employee code]-[employee name] have been accepted by [Reviewer name].</span><br>\<br>\
    <span>The performance appraisal has been completed.</span><br>\<br>\
    <span>To view the details of the performance appraisal, please <a href = ${CLIENT_URL}>log in</a> to the system.</span><br>\<br>\
    <span>This is a system-generated email, please do not reply.</span><br>\<br>\
    <span>Regards,</span><br>\
    <span>Human Resources Team</span>
    </div>
    `   
}

export {
    REVIEWER_ACCEPTS_PA_INFO,
    REVIEWER_ACCEPTS_RATING_UPTO_INFO,
    REVIEWER_REJECTS_PA_3RD_TIME_INFO
}