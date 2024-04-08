import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'

const userManagementSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name mandatory']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name mandatory']
    },
    age: {
        type: Number,
        required: [true, 'Age mandatory']
    },
    email: {
        type: String,
        required: [true, 'Email mandatory'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Enter valid Email'
        }
    }, 
    roles: {
        type: String,
        enum: ["student", "faculty", "princi", "infra"],
        default: "student"
    },
    password: {
        type: String,
        required: [true, 'Password mandatory'],
        minlength: 6
    },
    passwordConfirmation: {
        type: String,
        required: [true, 'Password confirm mandatory'],
        validate: {
            validator: function(v) {
                return v === this.password
            },
            message: 'Confirmation password has to match with Password'
        }
    }
}, {
    methods: {
        validatePassword: async function(clientPassword, dbPassword) {
            return await bcrypt.compare(clientPassword, dbPassword)
        }
    }
})

userManagementSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next()
    }
   this.password = await bcrypt.hash(this.password, 13)
   this.passwordConfirmation = undefined
   next()
})


export default mongoose.model('User', userManagementSchema)