import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bookDB';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connection established successfully!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

export default mongoose.connection;
