import {model, Schema} from "mongoose";

const RatingsSchema = new Schema( {
    rating: {
        type: Number,
        required: true
    },
},
    {timestamps: true})

export default model("Ratings", RatingsSchema);