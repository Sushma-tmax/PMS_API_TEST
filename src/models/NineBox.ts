import {model, Schema} from "mongoose";

const NineBox  = new Schema({
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
        }
    }
})

export default model("NineBox", NineBox);
