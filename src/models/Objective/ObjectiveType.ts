import {model, Schema, Types} from "mongoose";
import  UniqueValidator from 'mongoose-unique-validator'

const ObjectiveTypeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            uniqueCaseInsensitive: true
        },
        objective_group: {
            type: Schema.Types.ObjectId,
            ref: 'ObjectiveGroup',
            required: true,
            

        }
    },
    {
        timestamps: true
    }
)
ObjectiveTypeSchema.plugin(UniqueValidator)

const ObjectiveType = model('ObjectiveType', ObjectiveTypeSchema);

export default ObjectiveType;
