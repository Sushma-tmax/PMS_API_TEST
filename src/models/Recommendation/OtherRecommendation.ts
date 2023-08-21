
import {model, Schema} from "mongoose";
import  UniqueValidator from 'mongoose-unique-validator'


const OtherRecommendationSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    // sort_value: Number
    sort_value: {
        type: Number,
        required: true,
        unique: true,
        // uniqueCaseInsensitive: true
    },
},

    {timestamps: true})
OtherRecommendationSchema.plugin(UniqueValidator)

export default model('OtherRecommendation', OtherRecommendationSchema);
