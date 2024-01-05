import { CLIENT_URL } from "../../URL"

// Notification info after Normalizer accepts PA (for Appraiser / Reviewer)
const NORMALIZER_ACCEPTS_PA_INFO = {
    to: "[email]",
    subject: "[year] [calendar name] PA for [employee code]-[employee name] has been normalized",
    html:
        `
    <div style="font-size: 14px; font-family: Arial; color:black;">
    <span>Dear Employee,</span><br>\<br>\
    <span>The [year] [calendar name] performance appraisal for [employee code]-[employee name] has been normalized by [Normalizer name] and is now pending <b>employee acceptance</b>.</span><br>\<br>\
    <span>To view the details of the performance appraisal, please <a href = ${CLIENT_URL}>log in</a> to the system.</span><br>\<br>\
    <span>This is a system-generated email, please do not reply.</span><br>\<br>\
    <span>Regards,</span><br>\
    <span>Human Resources Team</span>
    </div>
    `
}

// Notification info after Normalizer accepts PA for grade 6-10 employees (for Appraiser / Reviewer)
const NORMALIZER_ACCEPTS_PA_INFO_GRADE_EXCEPTION = {
    to: "[email]",
    subject: "[year] [calendar name] PA for [employee code]-[employee name] has been normalized",
    html:
        `
    <div style="font-size: 14px; font-family: Arial; color:black;">
    <span>Dear Employee,</span><br>\<br>\
    <span>The [year] [calendar name] performance appraisal for [employee code]-[employee name] has been normalized by [Normalizer name].</span><br>\<br>\
    <span>The performance appraisal <b>has been completed.</b></span><br>\<br>\
    <span>To view the details of the performance appraisal, please <a href = ${CLIENT_URL}>log in</a> to the system.</span><br>\<br>\
    <span>This is a system-generated email, please do not reply.</span><br>\<br>\
    <span>Regards,</span><br>\
    <span>Human Resources Team</span>
    </div>
    `
}


// Notification info Re-normalization on changes completed by Normalizer after mediation (for Employee/Appraiser/Reviewer)
const NORMALIZER_MEDIATION_INFO = {
    to: "[email]",
    subject: "[year] [calendar name] Performance Appraisal for [employee code]-[employee name] submitted for mediation has been renormalized",
    html:
        `
    <div style="font-size: 14px; font-family: Arial; color:black;">
    <span>Dear Employee,</span><br>\<br>\
    <span>The [year] [calendar name] performance appraisal submitted by [employee code]-[employee name] for mediation has been renormalized by [Normalizer name].</span><br>\<br>\
    <span>During the mediation process, the final overall rating for the performance appraisal has been agreed upon as [renormalized rating].</span><br>\<br>\
    <span>Should you require any further clarification, please do not hesitate to contact the HR Team.</span><br>\<br>\
    <span>To view the details of the performance appraisal, please <a href = ${CLIENT_URL}>log in</a> to the system.</span><br>\<br>\
    <span>This is a system-generated email, please do not reply.</span><br>\<br>\
    <span>Regards,</span><br>\
    <span>Human Resources Team</span>
    </div>
    `
}
// Normalizer rejects Reviewer (overall rating difference greater than 0.3)(Employee/Appraiser/Reviewer)
const NORMALIZER_RENORMALIZATION_INFO = {
    to: "[email]",
    subject: "[year] [calendar name] PA changes for [employee code]-[employee name] has been renormalized",
    html:
        `
    <div style="font-size: 14px; font-family: Arial; color:black;">
    <span>Dear Employee,</span><br>\<br>\
    <span>The changes made to the [year] [calendar name] performance appraisal for [employee code]-[employee name] have been renormalized by [Normalizer name].</span><br>\<br>\
    <span>The final overall rating for the performance appraisal is [renormalized rating].</span><br>\<br>\
    <span>To view the details of the performance appraisal, please <a href = ${CLIENT_URL}>log in</a> to the system.</span><br>\<br>\
    <span>This is a system-generated email, please do not reply.</span><br>\<br>\
    <span>Regards,</span><br>\
    <span>Human Resources Team</span>
    </div>
    `
}
export {
    NORMALIZER_ACCEPTS_PA_INFO,
    NORMALIZER_ACCEPTS_PA_INFO_GRADE_EXCEPTION,
    NORMALIZER_MEDIATION_INFO,
    NORMALIZER_RENORMALIZATION_INFO
}