import {model, Schema} from "mongoose";
import  UniqueValidator from 'mongoose-unique-validator'


const CalenderSchema = new Schema({

        name: {
            type: String,
            required: true,
            unique: true,
            uniqueCaseInsensitive: true
        },
        pa_launch:{
            type: Date,
            required: true,
        },
        start_date: {
            type: Date,
            required: true,
        
        },
        end_date: {
            type: Date,
            required: true,
            
        },
        
        start_date_appraiser: {
                type: Date,
            required: true,
            },
            end_date_appraiser: {
                type: Date,
                required: true,
            },
        
        
            start_date_reviewer: {
                type: Date,
                required: true,
            },
            end_date_reviewer: {
                type: Date,
                required: true,
            },
        
        
            start_date_normalizer: {
                type: Date,
                required: true,
            },
            end_date_normalizer: {
                type: Date,
                required: true,
            },
        
        
            start_date_F2FMeeting: {
                type: Date,
                required: false,
            },
            end_date_F2FMeeting: {
                type: Date,
                required: false,
            },
        
        
            start_date_employee_acknowledgement: {
                type: Date,
                required: true,
            },
            end_date_employee_acknowledgement: {
                type: Date,
                required: true,
            },
        
        
            start_date_mediation: {
                type: Date,
                required: false,
            },
            end_date_mediation: {
                type: Date,
                required: false,
            },
        
        
            start_date_re_normalization: {
                type: Date,
                required: true,
            },
            end_date_re_normalization: {
                type: Date,
                required: true,
            },
        
        
            start_date_closing: {
                type: Date,
                required: true,
            },
            end_date_closing: {
                type: Date,
                required: true,
            },   
             isActive: {
            type: Boolean,
            default: false
        },   
        status:{
            type: String,
            default : "Draft"
        },
        calendar_type:{
            type: String,
            default : "Mid Year"
        },
        calendar_closing_date: {
            type: Date,
            //required: true,
        },  
        } ,{timestamps: true})

        CalenderSchema.plugin(UniqueValidator)
 

export default model("Calender", CalenderSchema);