import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!

if (!MONGODB_URL) {
    throw new Error("Define the mongo db  URL in env variables");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {

        const opts = {
            bufferCommands: true,
            maxPoolSize: 10
        };

        mongoose
            .connect(MONGODB_URL, opts)
            .then(() => mongoose.connection) // here we forgot to assign the cached.promise to this so it needs to be checked be later
    }

    try {
        cached.conn = await cached.promise;
    }
    catch (error) {
        cached.promise = null;
        return error;
    }

    return cached.conn;

}