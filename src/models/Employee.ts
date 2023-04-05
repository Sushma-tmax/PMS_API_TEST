import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'
import Template, { TemplateSchema } from "./Template";
import { string } from 'joi';


export interface Employee {
    EmployeeCode: string
    EmployeeName: string
    EmployeePosition: string
    EmployeeEmail: string
    EmployeeMobile: string
    EmployeeDepartment: string
    EmployeeSection: string
    EmployeeSubSection: string
    EmployeeAppraiserName: string
    EmployeeLineManagerName: string
    EmployeeReviewerName: string
    EmployeePAStatus: string
    EmployeePerformanceLevel: string
    EmployeePotentialLevel: string
    EmployeeNineBoxGridClassification: string
    EmployeeWorkLocation: string
    EmployeeAppraiserRating: string
    EmployeeNormalizerRating: string
    EmployeeReviewerRating: string
    EmployeeAppraiserOverallFeedback: string
    EmployeeAppraiserJustification: string
    EmployeeRecommendedAction: string
    EmployeeAppraiserRecommendationRemarks: string
    EmployeeAreasofImprovement: string
    EmployeeKeyStrengthsandQualities: string
    EmployeeAppraiserTrainingRecommendation: string
    EmployeeReviewerOverallFeedback: string
    EmployeeReviewerJustification: string
    EmployeeReviewerRecommendationRemarks: string
    EmployeeNormalizerJustification: string
    EmployeeNormalizerOverallFeedback: string
    EmployeeNormalizerRecommendationRemarks: string
    EmployeeSelfRating: string

    EmployeePreviousRating: string
    EmployeeAppraiserCode: string
    EmployeeReviewerCode: string
    EmployeeNormalizerCode: string
    EmployeeLineManagerCode: string
    EmployeeNormalizerName: string
    EmployeeLineManagerPosition: string
    EmployeeDivision: string
    EmployeePassword: string
    EmployeeGrade: string
    EmployeeDateofJoining: Date
    LastAppraisalDate: string
    LastModifiedDate: string
    FinalRating: string
   
}

const EmployeeSchema = new Schema({
    employee_code: {
        type: String,
    },
    name: {
        type: String,

    },
    legal_full_name: {
        type: String,

    },
    position_long_description: {
        type: String,
    },
    email: {
        type: String,
    },
    profile_image_url: {
        type: String
    },
    appraiser: String,
    mobile: {
        type: String,

    },
    department: {
        type: String,

    },
    section: {
      type: String,
    },
    division: {
        type: String,

    },
    password: {
        type: String,
    },
    grade: {
        type: String,
    },
    date_of_joining: {
        type: Date,
    },
    // service_date: {
    //
    // },
    position_code: {
        type: String,
    },
    line_manager_1: {
        type: String,
    },
    line_manager_2: {
        type: String,
    },
    last_appraisal_date: {
        type: String,
    },
    last_modified_date: {
        type: String,
    },
    final_rating: {
        type: String,
    },
    appraisal_status: {
        type: String,
        // enum: ["appraiser", "normalizer", "reviewer", "self-rating"],
    },
    talent_category: {
        type: String,
    },
    calendar: {
        type: Schema.Types.ObjectId,
        ref: "Calender",
    },
    isSupervisor: {
        type: Boolean
    },
    manager_code: String,
    manager_name: String,

    previous_appraisal: [{
        rating: Number,
        calendar: {
            type: Schema.Types.ObjectId,
            ref: "Calender",
        },
        appraiser_code: String,
        reviewer_code: String,
        normalizer_code: String,
        section: String,
        sub_section: String,
        division: String,
        manager_code: String,
        employee_code: String,
        appraisal: {
            rejection_count: Number,
            confirmed: Boolean,

            comments: {
                type: String,
                default: "",
            },

            appraiser_rejected: {
                type: Boolean,
                default: false
            },

            show_appraiser: {
                type: Boolean,
                default: false,
            },

            show_reviewer: {
                type: Boolean,
                default: false,
            },

            show_normalizer: {
                type: Boolean,
                default: false,
            },

            show_employee: {
                type: Boolean,
                default: false,
            },

            attachments: [{
                url: {type: String},
                objective_description: {type: String},
                name: {type: String}
            }],

            rejection_attachments: [{
                url: {type: String},
                objective_description: {type: String},
                name: {type: String}
            }],

            appraiser_status: {
                type: String,
                default: 'pending'
            },
            appraisal_acceptance: {
                type: Boolean,
            },

            pa_status: {
                type: String,
                default: "-"
            },

            status: {
                type: String,
                default: "not started"
            },
            appraiser_rating: {
                type: Number,
                default: 0
            },
            objective_group: [{
                name: {
                    type: String,
                },
                value: {
                    type: Number,
                },
            }],
            objective_type: [{
                name: {
                    type: String,
                },
                value: {
                    type: Number,
                },
            }],
            objective_description: [{
                name: {
                    type: String,
                },
                value: {
                    type: Number,
                },
                attachments: {
                    type: String,
                },
                ratings: {
                    type: Number,
                },
                rejection_reason: {
                    type: String,
                },
                rating_rejected: {
                    type: Boolean,
                    default: false
                },
                action_performed: {
                    type: Boolean,
                    default: false
                },
                rating_value: {
                    type: Number,
                },
                comments: {
                    type: String,
                },
                rating_comments: {
                    type: String,
                },
                level_1_isChecked: {
                    type: Boolean,
                    default: false
                },
                level_2_isChecked: {
                    type: Boolean,
                    default: false
                },
                level_3_isChecked: {
                    type: Boolean,
                    default: false
                },
                level_4_isChecked: {
                    type: Boolean,
                    default: false
                },
                description: {
                    type: String,
                    //unique: true,
                    // uniqueCaseInsensitive: true
                },
                objectiveTitle: {
                    type: String,
                    unique: true,
                    uniqueCaseInsensitive: true
                },
                level_1: {
                    level_definition: {
                        type: String,


                    },
                    behavioral_objective: [{
                        type: String
                    }],
                },
                level_2: {
                    level_definition: {
                        type: String,

                    },
                    behavioral_objective: [{
                        type: String
                    }],
                },
                level_3: {
                    level_definition: {
                        type: String,

                    },
                    behavioral_objective: [{
                        type: String
                    }],
                },
                level_4: {
                    level_definition: {
                        type: String,
                    },
                    behavioral_objective: [{
                        type: String
                    }],
                },
            }],
            feedback_questionnaire: [{
                name: {
                    type: String,
                },
                value: {
                    type: String
                }

            }],
            training_recommendation: [{
                name: {
                    type: String,
                },
                training_name: {
                    type: String,
                },
                justification: {
                    type: String,
                },
                comments: {
                    type: String,
                    default: ''
                },
                employee_comments: {
                    type: String,
                    default: ''
                },
            }],
            other_recommendation: [{
                name: {
                    type: String,
                },
                isChecked: {
                    type: Boolean,
                    default: false
                },
                comments: {
                    type: String,
                    default: ''
                },
                sort_value: Number
            }],

            appraiser_overall_feedback: {
                type: String,
                default: ''
            },

            other_recommendation_comments: {
                type: String,
                default: ''
            },
            feedback_questions_comments: {
                type: String,
                default: ''
            },
            area_of_improvement_comments: {
                type: String,
                default: ''
            },
            training_recommendation_comments: {
                type: String,
                default: ''
            },

            potential: {
                type: String
            },
            feedback_questions: [{
                name: {
                    type: Schema.Types.ObjectId,
                    ref: 'FeedBackQuestionaire'
                },
                value: {
                    type: String,
                    default: ""
                },
            }],

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
                    employee_comments: {
                        type: String
                    }
                }],
                employee_comments: {
                    type: String,
                    default: ""
                },

            }],
        }

    }],

    appraiser_code: String,
    appraiser_name: String,
    reviewer_code: String,
    reviewer_name: String,
    normalizer_code: String,
    normalizer_name: String,
    master_appraiser_code: String,
    master_appraiser_name: String,
    master_reviewer_code: String,
    master_reviewer_name: String,
    master_normalizer_code: String,
    master_normalizer_name: String,
    isGradeException: {
        type: Boolean,
        default: false
    },
    isRoleException: {
        type: Boolean,
        default: false
    },
    isCEORole: {
        type: Boolean,
        default: false
    },
    isLeavers: {
        type: Boolean,
        default: false
    },
    isExcluded: {
        type: Boolean,
        default: false
    },
    isSelected: {
        type: Boolean,
        default: false
    },
    previous_rating: {
      type: Number
    },



    employee: {
        one_to_one_meeting : {
            type: Date,            
        },
        employee_agree: {
            type: Boolean,
            default: false,
        },
        employee_status: {
            type: String,
            default: 'not-started'
        },  
        
        employee_rejection : {
            type: Boolean,
            default: false
        },
        
        attachments: [{
            url: { type: String },
            objective_description: { type: String },
            name: { type: String }
        }],

        employee_rating: {
            type: Number,
            default: 0,
        },
        comments: {
            type: String,
        },
        rejection_reason:{
            type: String,  
        },        
        training_recommendation: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: 'TrainingRecommendation'
            },
            training_name: {
                type: String,
            },
            justification: {
                type: String,
            },
            comments: {
                type: String,
                default: ''
            },
        }],
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
                employee_comments: {
                    type: String
                }
            }],
        }],
        sub_section: {
            type: String
        },
        objective_description: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: "ObjectiveDescription",
                required: true
            },
            value: {
                type: Number,
            },
            ratings: {
                type: Schema.Types.ObjectId,
                ref: "RatingScaleDescription",
            },
            rating_rejected: {
                type: Boolean,
                default: false
            },
            action_performed: {
                type: Boolean,
                default: false
            },
            rejection_reason: {
                type: String,
            },
            rating_value: {
                type: Number,
            },
            comments: {
                type: String,
            },
            level_1_isChecked: {
                type: Boolean,
                default: false
            },
            level_2_isChecked: {
                type: Boolean,
                default: false
            },
            level_3_isChecked: {
                type: Boolean,
                default: false
            },
            level_4_isChecked: {
                type: Boolean,
                default: false
            },
        }],
    },

    employee_previous_submission: {

        employee_status: {
            type: String,
            default: 'pending'
        },
       
        employee_rating: {
            type: Number,
            default: 0
        },
        objective_description: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: "ObjectiveDescription",
                required: true
            },
            value: {
                type: Number,
            },
            attachments: {
                type: String,
            },
            ratings: {
                type: Schema.Types.ObjectId,
                ref: "RatingScaleDescription",
            },
            remarks: {
                type: String,
            },
            rating_rejected: {
                type: Boolean,
                default: false
            },
            action_performed: {
                type: Boolean,
                default: false
            },
            rating_value: {
                type: Number,
            },
            rejection_reason: {
                type: String,
            },
            rating_comments: {
                type: String,
            },
            level_1_isChecked: {
                type: Boolean,
                default: false
            },
            level_2_isChecked: {
                type: Boolean,
                default: false
            },
            level_3_isChecked: {
                type: Boolean,
                default: false
            },
            level_4_isChecked: {
                type: Boolean,
                default: false
            },
        }],
 
    },

    roles: {
        appraiser: Boolean,
        reviewer: Boolean,
        normalizer: Boolean,
        employee: Boolean
    },

    default_role: {
        type: String
    },
    current_role: {
        type: String
    },

    employee_draft: {
        objective_description: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: "ObjectiveDescription",
                required: true
            },
            value: {
                type: Number,
            },
            ratings: {
                type: Schema.Types.ObjectId,
                ref: "RatingScaleDescription",
            },
            rating_rejected: {
                type: Boolean,
                default: false
            },
            rejection_reason: {
                type: String,
            },
            rating_value: {
                type: Number,
            },
            comments: {
                type: String,
            },
            level_1_isChecked: {
                type: Boolean,
                default: false
            },
            level_2_isChecked: {
                type: Boolean,
                default: false
            },
            level_3_isChecked: {
                type: Boolean,
                default: false
            },
            level_4_isChecked: {
                type: Boolean,
                default: false
            },
        }],
    },


    appraisal_template: {
        objective_group: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: "ObjectiveGroup",
                required: true
            },
            value: {
                type: Number,
            },
        }],
        objective_type: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: "ObjectiveType",
                required: true
            },
            value: {
                type: Number,
            },
        }],
        objective_description: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: "ObjectiveDescription",
                required: true
            },
            value: {
                type: Number,
            },
            ratings: {
                type: Schema.Types.ObjectId,
                ref: "Ratings",
            },
            level_1_isChecked: {
                type: Boolean,
                default: false
            },
            level_2_isChecked: {
                type: Boolean,
                default: false
            },
            level_3_isChecked: {
                type: Boolean,
                default: false
            },
            level_4_isChecked: {
                type: Boolean,
                default: false
            },

        }],
        training_recommendation: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: 'TrainingRecommendation',
                required: true
            }
        }],
        other_recommendation: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: 'OtherRecommendation'
            },
            isChecked: {
                type: Boolean,
                default: false
            },
            sort_value: Number
        }],

        potential: {
            type: Boolean,
        },

        rating: [{

            name: {
                type: Schema.Types.ObjectId,
                ref: 'RatingScaleDescription'
            },
        }],
        feedback_questionnaire: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: 'FeedBackQuestionaire'
            },
            value: {
                type: String
            }
        }],
    },

    appraisal: {
        rejection_count: Number,
        confirmed: Boolean,       

        comments: {
            type: String,
            default: "",
        },

        appraiser_rejected : {
            type: Boolean,
            default :false
        },

        show_appraiser: {
            type: Boolean,
            default: false,
        },

        show_reviewer: {
            type: Boolean,
            default: false,
        },

        show_normalizer: {
            type: Boolean,
            default: false,
        },

        show_employee: {
            type: Boolean,
            default: false,
        },      

        attachments: [{
            url: { type: String },
            objective_description: { type: String },
            name: { type: String }
        }],

        rejection_attachments: [{
            url: { type: String },
            objective_description: { type: String },
            name: { type: String }
        }],
      
        appraiser_status: {
            type: String,
            default: 'pending'
        },
        appraisal_acceptance: {
            type: Boolean,
        },

        pa_status: {
            type: String,
            default: "-"
        },

        pa_rating: {
            type: Number,
            default: 0
        },

        status: {
            type: String,
            default: "not started"
        },
        appraiser_rating: {
            type: Number,
            default: 0
        },
        objective_group: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: "ObjectiveGroup",
                required: true
            },
            value: {
                type: Number,
            },
        }],
        objective_type: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: "ObjectiveType",
                required: true
            },
            value: {
                type: Number,
            },
        }],
        objective_description: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: "ObjectiveDescription",
                required: true
            },
            value: {
                type: Number,
            },
            attachments: {
                type: String,
            },
            ratings: {
                type: Schema.Types.ObjectId,
                ref: "RatingScaleDescription",
            },
            rejection_reason: {
                type: String,
            },
            rating_rejected: {
                type: Boolean,
                default: false
            },

            rating_resubmitted : {
                type: Boolean,
                default : false
            },

            rating_accepted : {
                type: Boolean,
                default : false
            },
            
            action_performed: {
                type: Boolean,
                default: false
            },
            rating_value: {
                type: Number,
            },
            comments: {
                type: String,
            },
            rating_comments: {
                type: String,
            },
            level_1_isChecked: {
                type: Boolean,
                default: false
            },
            level_2_isChecked: {
                type: Boolean,
                default: false
            },
            level_3_isChecked: {
                type: Boolean,
                default: false
            },
            level_4_isChecked: {
                type: Boolean,
                default: false
            },
        }],
        feedback_questionnaire: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: 'FeedBackQuestionaire'
            },
            value: {
                type: String
            }

        }],
        training_recommendation: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: 'TrainingRecommendation'
            },
            training_name: {
                type: String,
            },
            justification: {
                type: String,
            },
            comments: {
                type: String,
                default: ''
            },
            employee_comments: {
                type: String,
                default: ''
            },
        }],
        other_recommendation: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: 'OtherRecommendation'
            },
            isChecked: {
                type: Boolean,
                default: false
            },
            comments: {
                type: String,
                default: ''
            },
            sort_value: Number
        }],

        appraiser_overall_feedback: {
            type: String,
            default: ''
        },

        other_recommendation_comments: {
            type: String,
            default: ''
        },
        feedback_questions_comments: {
            type: String,
            default: ''
        },
        area_of_improvement_comments: {
            type: String,
            default: ''
        },
        training_recommendation_comments: {
            type: String,
            default: ''
        },

        potential: {
            type: String
        },
        feedback_questions: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: 'FeedBackQuestionaire'
            },
            value: {
                type: String,
                default: ""
            },
        }],

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
                employee_comments: {
                    type: String
                }
            }],
            employee_comments: {
                type: String,
                default: ""
            },

        }],
    },

    appraisal_previous_submission: {

        appraiser_status: {
            type: String,
            default: 'pending'
        },
        pa_status: {
            type: String,
            default: "-"
        },
        status: {
            type: String,
            default: "not started"
        },
        appraiser_rating: {
            type: Number,
            default: 0
        },
        objective_description: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: "ObjectiveDescription",
                required: true
            },
            value: {
                type: Number,
            },
            attachments: {
                type: String,
            },
            ratings: {
                type: Schema.Types.ObjectId,
                ref: "RatingScaleDescription",
            },
            rejection_reason: {
                type: String,
            },
            rating_rejected: {
                type: Boolean,
                default: false
            },
            action_performed: {
                type: Boolean,
                default: false
            },
            rating_value: {
                type: Number,
            },
            comments: {
                type: String,
            },
            rating_comments: {
                type: String,
            },
            level_1_isChecked: {
                type: Boolean,
                default: false
            },
            level_2_isChecked: {
                type: Boolean,
                default: false
            },
            level_3_isChecked: {
                type: Boolean,
                default: false
            },
            level_4_isChecked: {
                type: Boolean,
                default: false
            },
        }],
        potential: {
            type: String
        },
    },


    appraisal_previous_rating: {

        appraiser_status: {
            type: String,
            default: 'pending'
        },
        pa_status: {
            type: String,
            default: "-"
        },
        status: {
            type: String,
            default: "not started"
        },
        appraiser_rating: {
            type: Number,
            default: 0
        },
        objective_description: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: "ObjectiveDescription",
                required: true
            },
            value: {
                type: Number,
            },
            attachments: {
                type: String,
            },
            ratings: {
                type: Schema.Types.ObjectId,
                ref: "RatingScaleDescription",
            },
            rejection_reason: {
                type: String,
            },
            rating_rejected: {
                type: Boolean,
                default: false
            },
            action_performed: {
                type: Boolean,
                default: false
            },
            rating_value: {
                type: Number,
            },
            comments: {
                type: String,
            },
            rating_comments: {
                type: String,
            },
            level_1_isChecked: {
                type: Boolean,
                default: false
            },
            level_2_isChecked: {
                type: Boolean,
                default: false
            },
            level_3_isChecked: {
                type: Boolean,
                default: false
            },
            level_4_isChecked: {
                type: Boolean,
                default: false
            },
        }],
        potential: {
            type: String
        },
    },

    current_rating: {
      
       overall_rating: {
            type: Number,
            default: 0
        },
        objective_description: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: "ObjectiveDescription",
                required: true
            },
            value: {
                type: Number,
            },
            attachments: {
                type: String,
            },
            ratings: {
                type: Schema.Types.ObjectId,
                ref: "RatingScaleDescription",
            },
            rejection_reason: {
                type: String,
            },
            rating_rejected: {
                type: Boolean,
                default: false
            },
            action_performed: {
                type: Boolean,
                default: false
            },
            rating_value: {
                type: Number,
            },
            comments: {
                type: String,
            },
            rating_comments: {
                type: String,
            },
            level_1_isChecked: {
                type: Boolean,
                default: false
            },
            level_2_isChecked: {
                type: Boolean,
                default: false
            },
            level_3_isChecked: {
                type: Boolean,
                default: false
            },
            level_4_isChecked: {
                type: Boolean,
                default: false
            },
        }],       
    },

    // "specific_actions": [{
    //     "value": "test1",
    //     "value": "test2",
    //     "value": "test3"
    //
    // }]
    reviewerIsChecked: {
        type: Boolean,
        default: false
    },
    reviewerIsDisabled: {
        type: Boolean,
        default: true
    },
    appraiserIsChecked: {
        type: Boolean,
    },
    appraiserIsDisabled: {
        type: Boolean,
        default: true
    },
    normalizerIsChecked: {
        type: Boolean,
        default: false
    },
    normalizerIsDisabled: {
        type: Boolean,
        default: true
    },

    reviewer: {
        rejection_count: Number,
        confirmed: Boolean,

        attachments: [{
            url: { type: String },
            objective_description: { type: String },
            name: { type: String }
        }],

        isChecked: {
            type: Boolean,
            default: false
        },
        reviewer_overall_feedback: {
            type: String,
            default: ''
        },
        reason_for_rejection: {
            type: String
        },
        reviewer_acceptance: {
            type: Boolean,
        },

        reviewer_status: {
            type: String,
            default: 'pending'
        },

        reviewer_rating: {
            type: Number,
            default: 0
        },
        reviewer_rejected_value: [{
            value: {
                type: String,
            },
            isChecked: {
                type: Boolean,
                default: false
            },
        }],

        // reviewer_rejected_value: [{
        //     value: {type: string}
        // }],

        objective_group: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: "ObjectiveGroup",
                required: true
            },
            value: {
                type: Number,
            },
        }],
        objective_type: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: "ObjectiveType",
                required: true
            },
            value: {
                type: Number,
            },
        }],
        objective_description: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: "ObjectiveDescription",
                required: true
            },
            value: {
                type: Number,
            },
            ratings: {
                type: Schema.Types.ObjectId,
                ref: "RatingScaleDescription",
            },
            rating_rejected: {
                type: Boolean,
                default: false
            },
            action_performed: {
                type: Boolean,
                default: false
            },
            rejection_reason: {
                type: String
            },
            comments: {
                type: String,
            },
            rating_comments: {
                type: String,
            },
            level_1_isChecked: {
                type: Boolean,
                default: false
            },
            level_2_isChecked: {
                type: Boolean,
                default: false
            },
            level_3_isChecked: {
                type: Boolean,
                default: false
            },
            level_4_isChecked: {
                type: Boolean,
                default: false
            },


        }],
        training_recommendation: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: 'TrainingRecommendation'
            },
            training_name: {
                type: String,
            },
            justification: {
                type: String,
            },

        }],
        other_recommendation_comments: {
            type: String,
            default: ''
        },
        training_recommendation_comments: {
            type: String,
            default: ''
        },
        feedback_questions_comments: {
            type: String,
            default: ''
        },
        area_of_improvement_comments: {
            type: String,
            default: ''
        },

        other_recommendation: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: 'OtherRecommendation'
            },
            isChecked: {
                type: Boolean,
                default: false
            },
            sort_value: Number

        }],


        area_of_improvement: [{
            value: {
                type: String,
                default: ''
            },
            specific_actions: [{
                value: {
                    type: String,
                    default: ''
                },
            }],

            comments: {
                type: String,
            },
        }],

        feedback_questions: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: 'FeedBackQuestionaire'
            },
            value: {
                type: String,
                default: ""
            },
        }],
    },

   reviewer_previous_submission: {

        reviewer_status: {
            type: String,
            default: 'pending'
        },
       
        reviewer_rating: {
            type: Number,
            default: 0
        },
        objective_description: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: "ObjectiveDescription",
                required: true
            },
            value: {
                type: Number,
            },
            attachments: {
                type: String,
            },
            ratings: {
                type: Schema.Types.ObjectId,
                ref: "RatingScaleDescription",
            },
            remarks: {
                type: String,
            },
            rating_rejected: {
                type: Boolean,
                default: false
            },
            action_performed: {
                type: Boolean,
                default: false
            },
            rating_value: {
                type: Number,
            },
            rejection_reason: {
                type: String,
            },
            rating_comments: {
                type: String,
            },
            level_1_isChecked: {
                type: Boolean,
                default: false
            },
            level_2_isChecked: {
                type: Boolean,
                default: false
            },
            level_3_isChecked: {
                type: Boolean,
                default: false
            },
            level_4_isChecked: {
                type: Boolean,
                default: false
            },
        }],
 
    },

    normalizer: {
        rejection_count: Number,
        confirmed: Boolean,

        attachments: [{
            url: { type: String },
            objective_description: { type: String },
            name: { type: String }
        }],


        meetingNotesAttachments: [{
            url: { type: String },
            name: { type: String }
        }],


        comments: {
            type: String,
        },

        normalizer_rejected : {
            type: Boolean,
            default: false
        },

        isChecked: {
            type: Boolean,
            default: false
        },

        isAppraiserChecked : {
            type: Boolean,
            default: false
        },

        isReviewerChecked : {
            type: Boolean,
            default: false
        },

        isEmployeeChecked : {
            type: Boolean,
            default: false
        },

        normalizer_overall_feedback: {
            type: String,
            default: ''
        },
        reason_for_rejection: {
            type: String
        },
        normalizer_meeting_notes: {
            type: String,
            default: ''
        },
        normalizer_status: {
            type: String,
            default: 'pending'
        },
        normalizer_acceptance: {
            type: Boolean,
        },
        normalizer_rating: {
            type: Number,
            default: 0
        },
        normalizer_rejected_value: [{
            value: {
                type: String,
            },
            isChecked: {
                type: Boolean,
                default: false
            },
        }],
        objective_group: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: "ObjectiveGroup",
                required: true
            },
            value: {
                type: Number,
            },
        }],
        objective_type: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: "ObjectiveType",
                required: true
            },
            value: {
                type: Number,
            },
        }],
        objective_description: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: "ObjectiveDescription",
                required: true
            },
            value: {
                type: Number,
            },
            ratings: {
                type: Schema.Types.ObjectId,
                ref: "RatingScaleDescription",
            },
            rating_rejected: {
                type: Boolean,
                default: false
            },

            rating_resubmitted : {
                type: Boolean,
                default: false  
            },
            
            action_performed: {
                type: Boolean,
                default: false
            },
            rejection_reason: {
                type: String,
            },
            rating_comments: {
                type: String,
            },
            level_1_isChecked: {
                type: Boolean,
                default: false
            },
            level_2_isChecked: {
                type: Boolean,
                default: false
            },
            level_3_isChecked: {
                type: Boolean,
                default: false
            },
            level_4_isChecked: {
                type: Boolean,
                default: false
            },


        }],
        training_recommendation: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: 'TrainingRecommendation'
            },
            training_name: {
                type: String,
            },
            justification: {
                type: String,
            },
        }],
        other_recommendation: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: 'OtherRecommendation'
            },
            isChecked: {
                type: Boolean,
                default: false
            },
            sort_value: Number
        }],
        other_recommendation_comments: {
            type: String,
            default: ''
        },
        training_recommendation_comments: {
            type: String,
            default: ''
        },
        feedback_questions_comments: {
            type: String,
            default: ''
        },
        area_of_improvement_comments: {
            type: String,
            default: ''
        },

        feedback_questions: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: 'FeedBackQuestionaire'
            },
            value: {
                type: String,
                default: ""
            },
        }],


        area_of_improvement: [{
            value: {
                type: String,
                default: ''
            },
            specific_actions: [{
                value: {
                    type: String,
                    default: ''
                },
            }],
        }],

    },

    normalizer_previous_submission: {

        normalizer_status: {
            type: String,
            default: 'pending'
        },
       
        normalizer_rating: {
            type: Number,
            default: 0
        },
        objective_description: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: "ObjectiveDescription",
                required: true
            },
            value: {
                type: Number,
            },
            attachments: {
                type: String,
            },
            ratings: {
                type: Schema.Types.ObjectId,
                ref: "RatingScaleDescription",
            },
            remarks: {
                type: String,
            },
            rating_rejected: {
                type: Boolean,
                default: false
            },
            action_performed: {
                type: Boolean,
                default: false
            },
            rating_value: {
                type: Number,
            },
            rejection_reason: {
                type: String,
            },
            rating_comments: {
                type: String,
            },
            level_1_isChecked: {
                type: Boolean,
                default: false
            },
            level_2_isChecked: {
                type: Boolean,
                default: false
            },
            level_3_isChecked: {
                type: Boolean,
                default: false
            },
            level_4_isChecked: {
                type: Boolean,
                default: false
            },
        }],
 
    },

})

export default model('Employee', EmployeeSchema)
