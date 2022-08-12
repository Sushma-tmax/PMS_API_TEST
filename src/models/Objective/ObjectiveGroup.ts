import {model, Schema} from "mongoose";
import  UniqueValidator from 'mongoose-unique-validator'

const ObjectiveGroupSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            uniqueCaseInsensitive: true
        },
    },
    {
        timestamps: true
    }
)
ObjectiveGroupSchema.plugin(UniqueValidator)


const ObjectiveGroup = model('ObjectiveGroup', ObjectiveGroupSchema);

export default ObjectiveGroup;
