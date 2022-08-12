import {model, Schema, Types} from "mongoose";
import  UniqueValidator from 'mongoose-unique-validator'

const ObjectiveTitleSchema = new Schema(
    {
        objective_title: {
            type: String,
            required: true,
            unique: true,
            uniqueCaseInsensitive: true
        },
        objective_definition: {
            type: String,
            required: true,
            // unique: true
        }
    },
    {
        timestamps: true
    }
)
ObjectiveTitleSchema.plugin(UniqueValidator)


const ObjectiveTitle = model('ObjectiveTitle', ObjectiveTitleSchema);

export default ObjectiveTitle;
