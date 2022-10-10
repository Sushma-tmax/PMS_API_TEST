import { boolean } from "joi";
import {model, Schema} from "mongoose";
import  UniqueValidator from 'mongoose-unique-validator'

const ObjectiveDescriptionSchema = new Schema(
    {
        description: {
            type: String,
            //unique: true,
           // uniqueCaseInsensitive: true
        },
        // detailed_description: {
        //     type: String,
        //     // unique: true,
        // },
        //
        // criteria: {
        //     type: String,
        //     enum: ['Rating', 'Choices', 'Text']
        // },
        objective_type: {
            type: Schema.Types.ObjectId,
            ref: 'ObjectiveType',
            // required: true
        },
        objective_title: {
            type: Schema.Types.ObjectId,
            ref: 'ObjectiveTitle',
            // required: true
        },
        objectiveTitle : {
            type: String,
            unique: true,
            uniqueCaseInsensitive: true
        },
        isTitleChecked: {
            type: Boolean,
            default: false
        },
        isTitleActive: {
            type: Boolean,
            default: false
        },

        level_1: {
            level_definition: {
                type:String,
                

            },
            behavioral_objective: [{
                type:String
            }],
        },
        level_2: {
            level_definition: {
                type:String,

            },
            behavioral_objective: [{
                type:String
            }],
        },
        level_3: {
            level_definition: {
                type:String,

            },
            behavioral_objective: [{
                type:String
            }],
        },
        level_4: {
            level_definition: {
                type:String,
            },
            behavioral_objective: [{
                type:String
            }],
        },

    },
    {
        timestamps: true
    }
)

ObjectiveDescriptionSchema.plugin(UniqueValidator)

const ObjectiveDescription = model('ObjectiveDescription', ObjectiveDescriptionSchema);

export default ObjectiveDescription;
