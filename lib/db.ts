import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;

if (!MONGODB_URL) {
    throw new Error('Please define the MONGODB_URL environment variable');
}

interface mongooseCache {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
}

declare global {
    var _mongoose: mongooseCache;
}

let cached = global._mongoose;

if (!cached) {
    cached = global._mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URL);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectToDatabase;