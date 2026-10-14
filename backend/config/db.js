import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (uri) {
    try {
      console.log('[Database] Connecting to configured MongoDB Atlas / Server...');
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 8000,
      });
      console.log(`[Database] MongoDB Connected: ${conn.connection.host} | Database: ${conn.connection.name}`);
      return conn;
    } catch (err) {
      console.error(`[Database] MongoDB Connection Failed: ${err.message}`);
      console.error('[Database] Please verify Atlas Network Access (IP Whitelist / 0.0.0.0/0) and credentials in .env.');
      throw err;
    }
  }

  // Fallback for offline local testing only if no URI is configured
  if (process.env.NODE_ENV !== 'production') {
    try {
      console.warn('[Database] WARNING: No MONGODB_URI configured. Starting temporary In-Memory MongoDB for testing...');
      mongod = await MongoMemoryServer.create({
        instance: {
          dbName: 'INOVIQ-SIKAR',
        },
      });
      const memoryUri = mongod.getUri();
      const conn = await mongoose.connect(memoryUri);
      console.log(`[Database] Temporary In-Memory MongoDB Server started: ${memoryUri}`);
      return conn;
    } catch (error) {
      console.error('[Database] Failed to initialize In-Memory MongoDB:', error.message);
      throw error;
    }
  }

  throw new Error('MONGODB_URI is not defined in environment variables.');
};

export const closeDB = async () => {
  await mongoose.disconnect();
  if (mongod) {
    await mongod.stop();
  }
};
