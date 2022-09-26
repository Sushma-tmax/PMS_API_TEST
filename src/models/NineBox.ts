import { model, Schema } from "mongoose";

const NineBox = new Schema({
    potential_definitions: {
        high: {
            type: String,
        },
        moderate: {
            type: String,
        },
        low: {
            type: String,
        }
    },
    performance_definitions: {
        high: {
            type: String,
        },
        medium: {
            type: String,
        },
        low: {
            type: String,
        },
        high_range: {
            type: String,
        },
        medium_range: {
            type: String,
        },
        low_range: {
            type: String,
        },
        high_from:{
            type : Number,
        },
        high_to:{
            type : Number,
        },
        medium_from:{
            type : Number,
        },
        medium_to:{
            type : Number,
        },
        low_from:{
            type : Number,
        },
        low_to:{
            type : Number,
        },

    },
    box_9_definitions: [{
        
        title: {
            type: String,
        },
        definition: {
            type: String,
        },
        performance_level: {
            type: String,
        },
        potential_level: {
            type: String,
        }
    }],
})

export default model("NineBox", NineBox);
