import {model, Schema} from "mongoose";
import  UniqueValidator from 'mongoose-unique-validator'

const FeedBackQuestionaireSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },

},
    {timestamps: true}
)

FeedBackQuestionaireSchema.plugin(UniqueValidator)


export default model('FeedBackQuestionaire', FeedBackQuestionaireSchema);