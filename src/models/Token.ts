import {model, Schema, Types} from "mongoose";


export interface Token {
    refreshToken: string;
    ip: string;
    userAgent: string;
    isValid: boolean;
    user: Types.ObjectId;

}

const TokenSchema = new Schema<Token>(
    {
        refreshToken: {type: String, required: true},
        ip: {type: String, required: true},
        userAgent: {type: String, required: true},
        isValid: {type: Boolean, default: true},
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {timestamps: true}
);

const TokenModel = model<Token>("Token", TokenSchema);

export default TokenModel;

