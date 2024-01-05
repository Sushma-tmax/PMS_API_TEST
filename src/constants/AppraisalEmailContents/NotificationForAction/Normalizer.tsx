import { CLIENT_URL } from "../../URL"

// Notification action to Employee after Normalizer accepts PA (for Employee)
const NORMALIZER_ACCEPTS_PA = {
    to: "[email]",
    subject: "[year] [calendar name] PA has been submitted for your review and feedback",
    html:  
    `
    <div style="font-size: 14px; font-family: Arial; color:black;">
    <span>Dear [Employee FirstName],</span><br>\<br>\

    <span>The [year] [calendar name] performance appraisal has been submitted by [Appraiser name] for your review and feedback.</span><br>\<br>\

    <span>Please note that before submitting your performance appraisal, it is mandatory to have a one-on-one meeting with your line manager.</span> 

    <span>This meeting will provide an opportunity for you to discuss your performance, provide additional context, and address any questions or concerns you may have.

    The due date for submitting your performance appraisal is <b>[dd/mm/yy]</b>.</span><br>\<br>\

    <span>To review the performance appraisal, please <a href = ${CLIENT_URL}>log in</a> to the system.</span><br>\<br>\

    <span>This is a system-generated email, please do not reply.</span><br>\<br>\

    <span>Regards,</span><br>\
    <span>Human Resources Team</span>
    </div>
    `

}


// Notification action Normalizer rejects Reviewer PA (for Appraiser/Reviewer) (Pre-normalization)
const NORMALIZER_REJECTS_PA = {
    to: "[email]",
    subject: "[year] [calendar name] PA for [employee code]-[employee name] has been rejected by HR Normalizer",
    html:  
    `
    <div style="font-size: 14px; font-family: Arial; color:black;">
    <span>Dear Employee,</span><br>\<br>\

    <span>The [year] [calendar name] performance appraisal for [employee code]-[employee name] has been rejected by [Normalizer name] and is now <b>pending resubmission</b>.</span><br>\<br>\

    <span>To resubmit the performance appraisal process, please <a href = ${CLIENT_URL}>log in</a> to the system.</span><br>\<br>\

    <span>This is a system-generated email, please do not reply.</span><br>\<br>\
    
    <span>Regards,</span><br>\
    <span>Human Resources Team</span>
    </div>
    `

}

export {
    NORMALIZER_ACCEPTS_PA,
    NORMALIZER_REJECTS_PA
}