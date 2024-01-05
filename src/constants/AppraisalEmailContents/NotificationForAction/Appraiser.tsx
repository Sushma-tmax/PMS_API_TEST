import { CLIENT_URL } from "../../URL"

// Notification action to Reviewer after Appraiser submitted PA (for Reviewer) (Pre-normalization)
const APPRAISER_SUBMITS_TO_REVIEWER = {
    to: "[email]",
    subject: "[year] [calendar name] PA for [employee code]-[employee name] is submitted for your review",
    html:
        `
        <div style="font-size: 14px; font-family: Arial; color:black;">
        <span> Dear [Reviewer FirstName],</span><br>\<br>\
        <span> The [year] [calendar name] performance appraisal for [employee code]-[employee name] has been completed by [Appraiser name] and is now <b>pending review</b>.</span><br>\<br>\
        <span> To review and provide your feedback on the performance appraisal, please <a href = ${CLIENT_URL}>log in</a> to the system.</span><br>\<br>\
        <span> This is a system-generated email, please do not reply.</span><br>\<br>\
        <span>Regards,</span><br>\
        <span>Human Resources Team</span>
    </div>
    `
}


// Notification action after Appraiser submits PA to Reviewer after Reviewer rejection -(for Reviewer)
const APPRAISER_RESUBMITS_REVIEWER_REJECTION = {
    to: "[email]",
    subject: "[year] [calendar name] PA for [employee code]-[employee name] has been resubmitted for review",
    html:
        `
        <div style="font-size: 14px; font-family: Arial; color:black;">
        <span>Dear [Reviewer FirstName],</span><br>\<br>\
        <span>The [year] [calendar name] performance appraisal for [employee code]-[employee name] has been resubmitted by [Appraiser name] and is now <b>pending review</b>.</span><br>\<br>\
        <span>To review the performance appraisal, please <a href = ${CLIENT_URL}>log in</a> to the system.</span><br>\<br>\
        <span>This is a system-generated email, please do not reply.</span><br>\<br>\
        <span>Regards,</span><br>\
        <span>Human Resources Team</span>
        </div>
        `
}


// Notification action after Appraiser submits PA to Reviewer after Normalizer rejection -(for Reviewer)
const APPRAISER_RESUBMITS_NORMALIZER_REJECTION = {
    to: "[email]",
    subject: "[year] [calendar name] PA for [employee code]-[employee name] has been resubmitted for review",
    html:
        `
        <div style="font-size: 14px; font-family: Arial; color:black;">
        <span>Dear [Reviewer FirstName],</span><br>\<br>\
        <span>The [year] [calendar name] performance appraisal for [employee code]-[employee name] has been resubmitted after [Normalizer name] rejection and is now <b>pending review</b>.</span><br>\<br>\
        <span>To review the performance appraisal, please <a href = ${CLIENT_URL}>log in</a> to the system.</span><br>\<br>\
        <span>This is a system-generated email, please do not reply.</span><br>\<br>\
        <span>Regards,</span><br>\
        <span>Human Resources Team</span>
        </div>
        `
}


// Notification action Appraiser accepts Employee rejected PA (overall rating difference greater than 0.3) (for Reviewer)
const APPRAISER_ACCEPTS_RATING_GREATER = {
    to: "[email]",
    subject: "[year] [calendar name] PA changes for [employee code]-[employee name] has been submitted for review",
    html:
        `
        <div style="font-size: 14px; font-family: Arial; color:black;">
        <span>Dear [Reviewer FirstName],</span><br>\<br>\
        <span>The changes made to the [year] [calendar name] performance appraisal for [employee code]-[employee name] have been accepted by [Appraiser name] and is now <b>pending review</b>.</span><br>\<br>\
        <span>Please note that the overall rating for the performance appraisal has been changed from [previous rating] to [new rating].</span><br>\<br>\
        <span>To review the details of the performance appraisal, please <a href = ${CLIENT_URL}>log in</a> to the system.</span><br>\<br>\
        <span>This is a system-generated email, please do not reply.</span><br>\<br>\
        <span>Regards,</span>
        <span>Human Resources Team</span>
        </div>
        `
}
// Notification action Appraiser rejects Employee PA (after employee rejection) (for Employee) (Renormalization)
const APPRAISER_REJECTS_EMPLOYEE = {
    to: "[email]",
    subject: "[year] [calendar name] Performance Appraisal changes has been rejected by Appraiser",
    html:
        `        
        <div style="font-size: 14px; font-family: Arial; color:black;">
        <span>Dear [Employee FirstName],</span><br>\<br>\
        <span>The changes made to the [year] [calendar name] performance appraisal has been rejected by [Appraiser name] and is now <b>pending resubmission</b>.</span><br>\<br>\
        <span>To review the details of the performance appraisal, please <a href = ${CLIENT_URL}>log in</a> to the system.</span><br>\<br>\
        <span>This is a system-generated email, please do not reply.</span><br>\<br>\        
        <span>Regards,</span><br>\
        <span>Human Resources Team</span>
        </div>
        `
}

export {
    APPRAISER_SUBMITS_TO_REVIEWER,
    APPRAISER_RESUBMITS_NORMALIZER_REJECTION,
    APPRAISER_ACCEPTS_RATING_GREATER,
    APPRAISER_REJECTS_EMPLOYEE,
    APPRAISER_RESUBMITS_REVIEWER_REJECTION
}

