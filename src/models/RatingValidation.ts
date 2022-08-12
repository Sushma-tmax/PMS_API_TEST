import {model, Schema} from "mongoose";
import  UniqueValidator from 'mongoose-unique-validator'



const RatingValidationSchema = new Schema({
    rating: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'RatingScaleDescription'
    }],
})


RatingValidationSchema.plugin(UniqueValidator)


const RatingValidation = model('RatingValidation', RatingValidationSchema);

export default RatingValidation;
