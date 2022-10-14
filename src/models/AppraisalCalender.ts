import {model, Schema} from "mongoose";
import UniqueValidator from 'mongoose-unique-validator'

const AppraisalCalenderSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true,
            uniqueCaseInsensitive: true,

        },
        status: {
            type: String,
            default: 'Draft',
        },
        template: {
            type: Schema.Types.ObjectId,
            ref: "Template",
        },

        calendar: {
            type: Schema.Types.ObjectId,
            ref: 'Calender',
        },
        rating: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: 'RatingScaleDescription'
            },
        }],

        weightage: {
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
                isChecked: {
                    type: Boolean,
                    default: false
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
                isChecked: {
                    type: Boolean,
                    default: false
                },
                value: {
                    type: Number,
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
                comments: {
                    type: String,
                },
                ratings: {
                    type: Schema.Types.ObjectId,
                    ref: "Ratings",
                },
            }],
            weightage_status: Boolean
        },

        position: {
            type: [{
                name: {
                    type: Schema.Types.ObjectId,
                    ref: "Employee"
                },
                isChecked: {
                    type: Boolean,
                    default: false
                }
            }]
        },


        training_recommendation: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: 'TrainingRecommendation'
            },
            isChecked: {
                type: Boolean,
                default: false
            },
            training_recommendation_status: Boolean
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
            other_recommendation_status: Boolean

        }],
        feedback_questionnaire: [{
            name: {
                type: Schema.Types.ObjectId,
                ref: 'FeedBackQuestionaire'
            },
            isChecked: {
                type: Boolean,
                default: false
            },
            feedback_status: Boolean
        }],
        potential: {
            type: Boolean,
            default: false
        }
    },
    {timestamps: true});
AppraisalCalenderSchema.plugin(UniqueValidator)

export default model("AppraisalCalender", AppraisalCalenderSchema);
