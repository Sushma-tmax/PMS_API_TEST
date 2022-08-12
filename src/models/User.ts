import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'

export interface User {
    name: string
    email: string
    password: string
    role: Enumerator
    isVerified: boolean
    verified: number | Date
    passwordTokenExpirationDate: Date
    verificationToken: string
    passwordToken: string
    comparePassword: (password: string) => Promise<boolean>
}

const UserSchema = new Schema<User>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['admin', 'employee']
    },
    verificationToken: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    verified: Date,
    passwordToken: {
        type: String,
    },
    passwordTokenExpirationDate: {
        type: Date,
    },
})

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}

const User = model<User>('User', UserSchema)

export default User
