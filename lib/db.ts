import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;

// console.log("Mongo URL:", process.env.MONGODB_URL)

if (!MONGODB_URL) {
    throw new Error('Please define the MONGODB_URL environment variable');
}

interface mongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

let cached: mongooseCache = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = await mongoose.connect(MONGODB_URL);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectToDatabase;