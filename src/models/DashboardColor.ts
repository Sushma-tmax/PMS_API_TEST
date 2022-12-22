import {model, Schema} from "mongoose";
import  UniqueValidator from 'mongoose-unique-validator'


const DashboardColorSchema = new Schema({
    color: String
})

export default model("color", DashboardColorSchema);

