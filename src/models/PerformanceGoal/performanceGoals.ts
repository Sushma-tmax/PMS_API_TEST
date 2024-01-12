import {model, Schema} from "mongoose";
import  UniqueValidator from 'mongoose-unique-validator'

const performanceGoalsSchema  = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    definition: {
        type: String,
         required: true,
        //  unique: false
    },
},
    {timestamps: true});

    performanceGoalsSchema.plugin(UniqueValidator)

export default model("performanceGoals", performanceGoalsSchema);