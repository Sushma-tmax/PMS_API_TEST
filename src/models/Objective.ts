import {model, Schema} from "mongoose";
import {ObjectiveDescription, ObjectiveGroup, ObjectiveType} from "./index";


const ObjectiveGroupSchema = new Schema(
    {
        objectiveGroupName: {
            type: String,
        },

    })



const ObjectiveTypeSchema = new Schema(
    {
        objectiveTypeName: {
            type: String,

        },
        objectiveGroup: {
            type: Schema.Types.ObjectId,
            ref: 'ObjectiveGroup',

        }
    })


const ObjectiveDescriptionSchema = new Schema(
    {
        name: {
            type: String,
        },
        objectiveType: {
            type: Schema.Types.ObjectId,
            ref: 'ObjectiveType',

        },
        description: {
            type: String,

        },
        detailedDescription: {
            type: String,

        },
        criteria: {
            type: String,
            enum: ['Rating', 'Choices', 'Text']
        },
    }
)



const ObjectiveSchema = new Schema({

    objectiveGroup: [ObjectiveGroupSchema],

    objectiveType: [ObjectiveTypeSchema],

    objectiveDescription: [ObjectiveDescriptionSchema],

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Objective = model('Objective', ObjectiveSchema);

export default Objective;