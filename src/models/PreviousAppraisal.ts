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
    profile_image_url: {
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
    rating_scale: {
        type: Array,
    },
    talent_category: {
        type: String,
    },
    first_name: {
        type: String,
    },
    function: {
        type: String,
    },
    email: {
        type: String,
    },
    normalizer_rating: {
        type: String,
    },
    reviewer_rating: {
        type: String,
    },
    appraiser_rating: {
        type: String,
    },
    employee_rating: {
        type: String,
    },
    normalized_overallRating: {
        type: String,
    },
    employee_status: {
        type: String,
    },
    status: {
        type: String,
    },
    previous_rating: {
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
        performance_goal: [{
            goal_category: {
                title: { type: String },  // Title of the goal category
                definition: { type: String },  // Definition of the goal category                 
            },
            description: {
                type: String,
            },
            keyresult: {
                type: String,
            },
            due_date: {
                type: Date,
            },
            remarks: {
                type: String,
            },
        }],

    },
    appraiser_PA_accepted: {
        type: String
    },
    appraiser_PA_rejected: {
        type: String
    },
    reviewer_PA_rejected: {
        type: Boolean,
        default: false
    },
    reviewer_PA_accepted: {
        type: Boolean,
        default: false
    },


    normalizer_PA_accepted: {
        type: Boolean,
        default: false
    },

    normalizer_PA_rejected: {
        type: Boolean,
        default: false
    },

    employee: {
        employee_status: {
            type: String
        },
        employee_agree: {
            type: Boolean
        },
        employee_rejection: {
            type: String
        },
        performance_goal: [{
            goal_category: {
                title: { type: String },  // Title of the goal category
                definition: { type: String },  // Definition of the goal category  
            },
            description: {
                type: String,
            },
            keyresult: {
                type: String,
            },
            due_date: {
                type: Date,
            },
            remarks: {
                type: String,
            },
        }],
        one_to_one_meeting: {
            type: Date,
        },
        training_recommendation: [{}],
        area_of_improvement: [{
            value: {
                type: String,
                default: ""
            },
            specific_actions: [{
                value: {
                    type: String,
                    default: ""
                },               
            }],
        }],
    },

    reviewer :{
        reviewer_PA_accepted: {
            type: Boolean,
            default: false
        },
        reviewer_PA_rejected: {
            type: Boolean,
            default: false
        },
        reviewer_overall_feedback: {
            type: String,
            default: ''
        },
        reviewer_comments: {
            type: String
        },
    },

    normalizer : {
        normalizer_PA_accepted: {
            type: Boolean,
            default: false
        },  
        normalizer_PA_rejected: {
            type: Boolean,
            default: false
        }, 
        comments: {
            type: String,
        },
        reason_for_rejection: {
            type: String
        },
        normalizer_overall_feedback: {
            type: String,
            default: ''
        }, 
        normalizer_meeting_notes: {
            type: String,
            default: ''
        },
        meetingNotesAttachments: [{
            url: { type: String },
            name: { type: String }
        }],
        isAppraiserChecked: {
            type: Boolean,
            default: false
        },
        isReviewerChecked: {
            type: Boolean,
            default: false
        },
        isEmployeeChecked: {
            type: Boolean,
            default: false
        },
    },

    high: {
        type: String
    },
    moderate: {
        type: String
    },
    low: {
        type: String
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
    training_recommendations_employee: {
        type: Array,
    },
    
    area_of_improvements_employee: {
        type: Array,
    },
    feedback_questions: {
        type: Array,
    },
    objective_type: {
        type: Array,
    },

}, { timestamps: true })

export default model("PreviousAppraisal", PreviousAppraisal)