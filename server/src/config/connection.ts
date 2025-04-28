import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bookDB';

// ⚡ Disable buffering BEFORE connecting
mongoose.set('bufferCommands', false);

// ✅ Export an async function to connect
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connection established successfully!');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit if cannot connect
  }
};

export default mongoose.connection;
