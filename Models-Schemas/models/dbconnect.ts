import mongoose from 'mongoose';

export default async function connect() : Promise<mongoose.Connection | null> {


    if (!process.env.MONGODB_URI) {
        throw new Error("☠ Database connection string is missing");
        // this will create an error object with the given message and passed to nearest catch block if any, otherwise if we have handled it while calling connection with try-catch block
        // if both cases are not there than it crashes the application
    }

    if (mongoose.connection.readyState >= 1) {
        console.log("※ Already connected to MongoDB");
        return mongoose.connection;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Database connection established successfully!");
        return db.connection;  // this is helpfull to check if the connection is established on not
        // const db = await connect();
        // if(!db) console.log("unable to connect to the database")
    } catch (e: any) {
        console.error("❌ Error while connecting to the database:", e.message);
        throw new Error("Database connection failed");
        return null;
    }

}
