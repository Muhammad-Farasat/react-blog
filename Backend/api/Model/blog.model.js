import mongoose from "mongoose";

const Blog = mongoose.model("Blog", {
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    description:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true
    },
    like:{
        type: Number,
        default: 0
    },
    dislike:{
        type: Number,
        default: 0
    },
    comment:[{
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        comment: {type: String},
        createdAt: { type: Date, default: Date.now },
    }]
})

export default Blog