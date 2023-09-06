import { model, Schema } from "mongoose";

const PreviousAppraisal = new Schema({

    employee_code: {
        type: String,
    },
    legal_full_name: {
        type: String,
    },
    position_long_description: {
        type: String,
    },
    grade: {
        type: String,
    },
    division: {
        type: String,
    },
    appraiser_name: {
        type: String,
    },
    appraiser_code: {
        type: String,
    },
    reviewer_code: {
        type: String,
    },
    normalizer_code: {
        type: String,
    },
    reviewer_name: {
        type: String,
    },
    normalizer_name: {
        type: String,
    },
    potential: {
        type: String,
    },
    manager_code: {
        type: String,
    },
    manager_name: {
        type: String,
    },
    manager_position: {
        type: String,
    },

    work_location: {
        type: String,
    },
    probation_status: {
        type: String,
    },
    service_reference_date: {
        type: String,
    },
    sub_section: {
        type: String,
    },
    section: {
        type: String,
    },
    isCEORole: {
        type: Boolean,
    },
    isExcluded: {
        type: Boolean,
    },
    isGradeException: {
        type: Boolean,
    },
    isLeavers: {
        type: Boolean,
    },
    isRoleException: {
        type: Boolean,
    },
    area_of_improvement: {
        type: Array,
    },
    objective_description: {
        type: Array,
    },
    overall_rating: {
        type: Number
    },
    rating_scale : {
        type: Array,
    },
    talent_category : {
        type: String,
    },
    first_name : {
        type: String,
    },
    appraisal: {
        appraiser_overall_feedback: {
            type: String
        },
        pa_rating: {
            type: String
        },
        potential: {
            type: String
        },
        status: {
            type: String
        },
    },
    employee: {
        employee_status: {
            type: String
        },
        employee_agree: {
            type: Boolean
        },
        employee_rejection:{
            type: String
        },
    },
    // objective_description: [{
    //     description: {
    //         type: String,
    //         //unique: true,
    //         // uniqueCaseInsensitive: true
    //     },
    //     objectiveTitle: {
    //         type: String,
    //         // unique: true,
    //         // uniqueCaseInsensitive: true
    //     },
    //     rejection_reason: {
    //         type: String,
    //     },
    //     comments: {
    //         type: String,
    //         default: "",
    //     },
    // }],
    // objective_group: {
    //     objective_group: {
    //         type: String,
    //         default: "",
    //     },
    //     value: {
    //         type: String,
    //         default: "",
    //     },
    // },
    // objective_type: {
    //     objective_type: {
    //         type: String,
    //         default: "",
    //     },
    //     value: {
    //         type: String,
    //         default: "",
    //     },
    // },
    calendar: {
        type: Schema.Types.ObjectId,
        ref: "Calender",
    },
    other_recommendation: {
        type: Array,
    },
    training_recommendation: {
        type: Array,
    },
    feedback_questions :{
        type: Array,
    },
    objective_type : {
        type: Array,
    },

})

export default model("PreviousAppraisal", PreviousAppraisal)