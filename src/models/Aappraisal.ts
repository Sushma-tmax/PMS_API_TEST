import {Schema} from "mongoose";

const AappraisalSchema = new Schema({
    template: {
        type: Schema.Types.ObjectId,
        ref: 'Template'
    },
    training_recommendation: {
        type: Schema.Types.ObjectId,
        ref: 'TrainingRecommendation'
    },
    other_recommendation: {
        type: Schema.Types.ObjectId,
        ref: 'OtherRecommendation'
    },

})