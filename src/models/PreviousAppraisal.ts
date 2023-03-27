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
        type: String,
    },
    isExcluded: {
        type: String,
    },
    isGradeException: {
        type: String,
    },
    isLeavers: {
        type: String,
    },
    isRoleException: {
        type: String,
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
    talent_category : {
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

})

export default model("PreviousAppraisal", PreviousAppraisal)