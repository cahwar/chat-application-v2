import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("Connected to data base");
    } catch (error) {
        console.log(error);
    }
};

export default connectToDb;