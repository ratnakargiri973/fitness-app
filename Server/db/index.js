import mongoose from "mongoose";
import "dotenv/config"

const Mongo_Url = process.env.MONGO_URL;
const Db = process.env.Db;

export const dbConnector = async () => {
    try {
        await mongoose.connect(Mongo_Url, {dbName: Db});
    } catch (error) {
        console.log("Error in connecting to database"+ error);
    }
}