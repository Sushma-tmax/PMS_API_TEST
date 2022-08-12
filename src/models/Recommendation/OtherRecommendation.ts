
import {model, Schema} from "mongoose";
import  UniqueValidator from 'mongoose-unique-validator'


const OtherRecommendationSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    }
},

    {timestamps: true})
OtherRecommendationSchema.plugin(UniqueValidator)

export default model('OtherRecommendation', OtherRecommendationSchema);
