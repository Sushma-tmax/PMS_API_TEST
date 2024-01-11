import {model, Schema} from "mongoose";
import  UniqueValidator from 'mongoose-unique-validator'

const performanceGoals  = new Schema({
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

    performanceGoals.plugin(UniqueValidator)

export default model("performanceGoals", performanceGoals);