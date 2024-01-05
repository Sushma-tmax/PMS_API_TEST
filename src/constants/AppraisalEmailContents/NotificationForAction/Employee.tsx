import { CLIENT_URL } from "../../URL"

// Notification action Employee rejects PA (agreed with Appraiser) (for Appraiser)
const EMPLOYEE_REJECTS_AGREED = {
    to: "[email]",
    subject: "[year] [calendar name] PA has been rejected by [employee code]-[employee name]",
    html:
    `
    <div style="font-size: 14px; font-family: Arial; color:black;">
    <span>Dear [Appraiser FirstName],</span><br>\<br>\
    <span>The [year] [calendar name] performance appraisal has been rejected by [employee code]-[employee name].</span><br>\
    <span>[Appraiser name] and the employee have agreed to make the necessary change(s) in the performance appraisal, and it is now <b>pending review</b>.</span><br>\<br>\
    <span>To review the updated performance appraisal, please <a href = ${CLIENT_URL}> log in </a> to the system.</span><br>\<br>\
    <span>This is a system-generated email, please do not reply.</span><br>\<br>\
    <span>Regards,</span><br>\
    <span>Human Resources Team</span>
    </div>
    `  
     
}


// Notification action Employee rejects PA (disagreed with Appraiser) (for Normalizer)
const EMPLOYEE_REJECTS_DISAGREED = {
    to: "[email]",
    subject: "[year] [calendar name] PA for [employee code]-[employee name] has been submitted for mediation",
    html:
    `
    <div style="font-size: 14px; font-family: Arial; color:black;">
    <span>Dear [Normalizer FirstName],</span><br>\<br>\
    <span>The [year] [calendar name] performance appraisal has been rejected by [employee code]-[employee name] and is now <b>pending mediation</b>.</span> <br>\
    <span>Employee disagreed with the performance appraisal rating provided by [Appraiser name].</span><br>\<br>\
    <span>To review the performance appraisal details, please <a href = ${CLIENT_URL}> log in </a> to the system.</span><br>\<br>\
    <span>This is a system-generated email, please do not reply.</span><br>\<br>\
    <span>Regards,</span><br>\
    <span>Human Resources Team</span>
    </div>
    `  
     
}



export {
    EMPLOYEE_REJECTS_AGREED,
    EMPLOYEE_REJECTS_DISAGREED   
}