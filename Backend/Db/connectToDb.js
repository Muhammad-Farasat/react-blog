import mongoose from 'mongoose'

const connectToDb = ()=>{
    mongoose.connect(process.env.DB_URL)
    mongoose.connection.on('connected', ()=>{
    console.log("Mongo DB is connected..!");
    })
    mongoose.connection.off("not-connected", ()=>{
        console.log("DB not connected!");
    })
}

export default connectToDb