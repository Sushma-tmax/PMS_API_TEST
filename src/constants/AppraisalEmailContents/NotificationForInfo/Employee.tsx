import { CLIENT_URL } from "../../URL"

// Notification info Employee accepts PA - (for Appraiser/ Reviewer)
const EMPLOYEE_ACCEPTS_PA_INFO = {
    to: "[email]",
    subject: "[year] [calendar name] PA has been accepted by [employee code]-[employee name]",
    html:
    `
    <div style="font-size: 14px; font-family: Arial; color:black;">
    <span>Dear Employee,</span><br>\<br>\
    <span>The [year] [calendar name] performance appraisal has been accepted by [employee code]-[employee name].</span><br>\<br>\
    <span>The performance appraisal was <b>completed</b>.</span><br>\<br>\
    <span>To view the performance appraisal, please <a href = ${CLIENT_URL}> log in </a> to the system.</span><br>\<br>\
    <span>This is a system-generated email, please do not reply.</span><br>\<br>\
    <span>Regards,</span><br>\
    <span>Human Resources Team</span>
    </div>
    `      
}

// Notification info Employee rejects PA (disagreed with Appraiser) - (for Appraiser/Reviewer)
const EMPLOYEE_REJECTS_DISAGREED_INFO = {
    to: "[email]",
    subject: "[year] [calendar name] PA has been rejected by [employee code]-[employee name] and requires mediation",
    html:
    `
    <div style="font-size: 14px; font-family: Arial; color:black;">
    <span>Dear Employee,</span><br>\<br>\    
    <span>The [year] [calendar name] performance appraisal has been rejected by [employee code]-[employee name] and has been submitted to [Normalizer name] for mediation.</span><br>\<br>\
    <span><b>Employee disagreed</b> with the performance appraisal rating provided by [Appraiser name].</span><br>\<br>\ 
    <span>To view the performance appraisal details, please <a href = ${CLIENT_URL}>log in</a> to the system.</span><br>\<br>\
    <span> This is a system-generated email, please do not reply.</span><br>\<br>\
    <span>Regards,</span><br>\
    <span> Human Resources Team</span>
    </div>
    `      
}


// Notification info Employee accepts PA (agreed with Appraiser) - (for Appraiser/Reviewer)
const EMPLOYEE_ACCEPTS_AGREED_INFO = {
    to: "[email]",
    subject: "[year] [calendar name] PA has been accepted by [employee code]-[employee name]",
    html:
    `
    <div style="font-size: 14px; font-family: Arial; color:black;">
    <span>Dear Employee,</span><br>\<br>\    
    <span>The [year] [calendar name] performance appraisal has been accepted by [employee code]-[employee name] and is now pending renormalization.</span><br>\<br>\
    <span>To approve the changes in the performance appraisal, please <a href = ${CLIENT_URL}>log in</a> to the system.</span><br>\<br>\
    <span> This is a system-generated email, please do not reply.</span><br>\<br>\
    <span>Regards,</span><br>\
    <span> Human Resources Team</span>
    </div>
    `      
}

export {
    EMPLOYEE_ACCEPTS_PA_INFO,
    EMPLOYEE_REJECTS_DISAGREED_INFO,
    EMPLOYEE_ACCEPTS_AGREED_INFO
}