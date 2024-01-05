import { CLIENT_URL } from "../../URL"

// Notification action after Reviewer accepts PA (for Normalizer)
const REVIEWER_ACCEPTS_PA = {
    to: "[email]",
    subject: "[year] [calendar name] PA for [employee code]-[employee name] has been submitted for normalization",
    html:
    `
    <div style="font-size: 14px; font-family: Arial; color:black;">
    <span>Dear [Normalizer FirstName],</span><br>\<br>\

    <span>The [year] [calendar name] performance appraisal for [employee code]-[employee name] has been accepted by [Reviewer name] and is now <b>pending HR normalization</b>.</span><br>\<br>\

    <span>To complete the performance appraisal process, please <a href = ${CLIENT_URL}>log in</a> to the system.</span><br>\<br>\

    <span>This is a system-generated email, please do not reply.</span><br>\<br>\

    <span>Regards,</span><br>\
    <span>Human Resources Team</span>
    </div>
    `  
     
}

// Notification action after Reviewer rejects PA (for Appraiser) (Pre-normalization)
const REVIEWER_REJECTS_PA = {
    to: "[email]",
    subject: "[year] [calendar name] PA for [employee code]-[employee name] has been rejected by Reviewer",
    html:
    `
    <div style="font-size: 14px; font-family: Arial; color:black;">
    <span>Dear [Appraiser FirstName],</span><br>\<br>\

    <span>The [year] [calendar name] performance appraisal for [employee code]-[employee name] has been rejected by [Reviewer name] and is now <b>pending resubmission</b>.</span><br>\<br>\

    <span>To resubmit the performance appraisal process, please <a href = ${CLIENT_URL}>log in</a> to the system.</span><br>\<br>\

    <span>This is a system-generated email, please do not reply.</span><br>\<br>\

    <span>Regards,</span><br>\
    <span>Human Resources Team</span>
    </div>
    `       
}

// Notification action after Reviewer accepts PA after Normalizer rejection (for Normalizer)
const REVIEWER_ACCEPTS_PA_AFTER_NORMALIZER_REJECTION = {
    to: "[email]",
    subject: "[year] [calendar name] PA for [employee code]-[employee name] has been resubmitted for normalization",
    html:
    `
    <div style="font-size: 14px; font-family: Arial; color:black;">
    <span>Dear [Normalizer FirstName],</span><br>\<br>\
    <span>The [year] [calendar name] performance appraisal for [employee code]-[employee name] has been resubmitted after the HR Normalizer rejection and is now <b>pending normalization</b>.</span><br>\<br>\   
    <span>To review the performance appraisal, please <a href = ${CLIENT_URL}>log in</a> to the system.</span><br>\<br>\
    <span>This is a system-generated email, please do not reply.</span><br>\<br>\
    <span>Regards,</span><br>\
    <span>Human Resources Team</span>
    </div>
    `       
}


// Notification action Reviewer accepts Employee rejected PA (overall rating difference greater than 0.3) (for Normalizer)
const REVIEWER_ACCEPTS_PA_AFTER_EMPLOYEE_REJECTION = {
    to: "[email]",
    subject: "[year] [calendar name] PA changes for [employee code]-[employee name] has been submitted for renormalization",
    html:
    `
    <div style="font-size: 14px; font-family: Arial; color:black;">
    <span>Dear [Normalizer FirstName],</span><br>\<br>\
    <span>The changes made to the [year] [calendar name] performance appraisal for [employee code]-[employee name] have been accepted by [Reviewer name] and are now <b>pending renormalization</b>.</span><br>\<br>\
    
    <span>Please note that the overall rating for the performance appraisal has been changed from [previous rating] to [new rating].</span><br>\<br>\
   
    <span>To review the details of the performance appraisal, please <a href = ${CLIENT_URL}>log in</a> to the system.</span> <br>\<br>\

    <span>This is a system-generated email, please do not reply.</span><br>\<br>\
    <span>Regards,</span><br>\
    <span>Human Resources Team</span>
    </div>
    `  
     
}

// Notification action Reviewer rejects Employee rejected PA (overall rating difference greater than 0.3) (For Appraiser)
const REVIEWER_REJECTS_PA_AFTER_EMPLOYEE_REJECTION = {
    to: "[email]",
    subject: "[year] [calendar name] PA changes for [employee code]-[employee name] has been rejected by Reviewer",
    html:
    `
    <div style="font-size: 14px; font-family: Arial; color:black;">
    <span>Dear [Appraiser FirstName],</span><br>\<br>\

    <span>The [year] [calendar name] performance appraisal changes for [employee code]-[employee name] have been rejected by [Reviewer name] and is now <b>pending resubmission</b>.</span><br>\<br>\

    <span>To resubmit the performance appraisal, please <a href = ${CLIENT_URL}>log in</a> to the system.</span><br>\<br>\
   
    <span>This is a system-generated email, please do not reply.</span><br>\<br>\
    
    <span>Regards,</span><br>\
    <span>Human Resources Team</span>
    </div> 
    `  
     
}

export {
    REVIEWER_ACCEPTS_PA,
    REVIEWER_REJECTS_PA,
    REVIEWER_ACCEPTS_PA_AFTER_NORMALIZER_REJECTION,
    REVIEWER_ACCEPTS_PA_AFTER_EMPLOYEE_REJECTION,
    REVIEWER_REJECTS_PA_AFTER_EMPLOYEE_REJECTION
}