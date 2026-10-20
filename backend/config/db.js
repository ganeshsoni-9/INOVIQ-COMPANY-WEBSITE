
import mongoose from 'mongoose';

/**
 * INOVIQ GLOBAL
 * MongoDB Atlas Database Configuration
 * Compatible with Render Production Deployment
 */

export const connectDB = async () => {
  try {
    // Get MongoDB connection URI
    const mongoURI =
      process.env.MONGODB_URI || process.env.MONGO_URI;

    // Check MongoDB URI
    if (!mongoURI) {
      throw new Error(
        'MongoDB URI missing! Please configure MONGODB_URI or MONGO_URI.'
      );
    }

    console.log('[Database] Connecting to MongoDB...');

    // Connect to MongoDB Atlas
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    console.log('====================================');
    console.log('INOVIQ GLOBAL DATABASE CONNECTED');
    console.log(`Host: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    console.log('====================================');

    return conn;

  } catch (error) {
    console.error('====================================');
    console.error('MongoDB Connection Failed');
    console.error(`Error: ${error.message}`);
    console.error('====================================');

    throw error;
  }
};

/**
 * Close MongoDB connection
 */
export const closeDB = async () => {
  try {
    await mongoose.disconnect();

    console.log(
      '[Database] MongoDB disconnected successfully'
    );

  } catch (error) {
    console.error(
      '[Database] Error disconnecting MongoDB:',
      error.message
    );

    throw error;
  }
};
