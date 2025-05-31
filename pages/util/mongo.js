import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error(
    '❌ Please define the MONGO_URL environment variable in .env.local'
  );
}

// Use global cache in dev to prevent multiple connections
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGO_URL, options).then((mongoose) => {
      console.log("✅ Connected to MongoDB");
      return mongoose;
    }).catch((err) => {
      console.error("❌ MongoDB connection error:", err);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
