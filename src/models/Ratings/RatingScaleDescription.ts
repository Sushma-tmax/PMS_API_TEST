import {model, Schema} from "mongoose";
import  UniqueValidator from 'mongoose-unique-validator'

const RatingScaleDescriptionSchema = new Schema({

        rating: {
            type: Number,
            required: true,
            unique: true,
            
        },
        rating_scale: {
            type: String,
            required: true,
            // unique: true,
            // uniqueCaseInsensitive: true
        },
        definition: {
            type: String,
            // required: true,
            // unique: true
        },
    },
    {timestamps: true})

    RatingScaleDescriptionSchema.plugin(UniqueValidator)


export default model("RatingScaleDescription", RatingScaleDescriptionSchema);