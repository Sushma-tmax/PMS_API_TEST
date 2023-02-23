import {model, Schema} from "mongoose";
import  UniqueValidator from 'mongoose-unique-validator'

export interface validations {
    confirmEmployeeMaster: boolean
    confirmTemplate: boolean
}
const launchcalendarvalidationsSchema = new Schema({
    confirmEmployeeMaster: {
        type: Boolean,
        default: false
    },
    confirmTemplate: {
        type: Boolean,
        default: false
    },
})

export default model("launchcalendarvalidations", launchcalendarvalidationsSchema);

