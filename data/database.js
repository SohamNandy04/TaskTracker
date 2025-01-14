import mongoose from "mongoose";


export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "TODOAPP",
    })
    .then(() => console.log("Database Connected"))
    .catch((e)=>console.log(e))
}