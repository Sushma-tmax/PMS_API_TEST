import {model, Schema} from "mongoose";
import  UniqueValidator from 'mongoose-unique-validator'

const TrainingRecommendationSchema  = new Schema({
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

    TrainingRecommendationSchema.plugin(UniqueValidator)

export default model("TrainingRecommendation", TrainingRecommendationSchema);