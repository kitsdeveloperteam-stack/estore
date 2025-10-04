import mongoose from 'mongoose';

export async function connectDatabase(uri) {
  if (!uri) {
    throw new Error('MongoDB connection string is missing');
  }

  try {
    await mongoose.connect(uri, {
      dbName: process.env.MONGO_DB_NAME || 'estore'
    });
    console.log('MongoDB connection established');
  } catch (error) {
    console.error('MongoDB connection failed', error);
    throw error;
  }
}

export default mongoose;
