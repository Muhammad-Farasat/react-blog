import mongoose, { model } from "mongoose";

const User = mongoose.model('User', {
    username:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
})

export default User