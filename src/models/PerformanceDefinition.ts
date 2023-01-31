import { model, Schema } from "mongoose";

const PerformanceDefinition = new Schema({   
        category: {
            type: String,
        },
        from: {
            type: Number,
        },
        to: {
            type: Number,
        }    
})

export default model("PerformanceDefinition", PerformanceDefinition);
