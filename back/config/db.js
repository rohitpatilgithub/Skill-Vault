import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connection established with database ${conn.connection.host}`)
    } catch (error) {
        console.log('Error : ',error.message);
        process.exit(1);
    }
}