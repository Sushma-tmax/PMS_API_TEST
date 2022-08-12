import {model, Schema} from "mongoose";


const LevelSchema = new Schema(
    {


        level_1: {
            level_definition: {
                type:String,
                default: 'General Awareness'
            },
            behavioral_objective: [{
                type:String
            }],
        },
        level_2: {
            level_definition: {
                type:String,
                default: 'Working knowledge and understanding'
            },
            behavioral_objective: [{
                type:String
            }],
        },
        level_3: {
            level_definition: {
                type:String,
                default: 'Best practice knowledge and ability to implement'
            },
            behavioral_objective: [{
                type:String
            }],
        },
        level_4: {
            level_definition: {
                type:String,
                default: 'Subject matter expert with ability to develop and coach others'
            },
            behavioral_objective: [{
                type:String
            }],
        },

    },
    {
        timestamps: true
    }
)


const ObjectiveDescription = model('ObjectiveDescription', LevelSchema);

export default ObjectiveDescription;
