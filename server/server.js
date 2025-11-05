import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authrouter from "../server/routes/auth.route.js"
import messagerouter from "../server/routes/messsage.route.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use(express.json());

app.use("api/auth",authrouter);
app.use("api/message",messagerouter)
// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(error => console.error('❌ MongoDB connection error:', error));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});