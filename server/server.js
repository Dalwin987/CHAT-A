import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'
import authrouter from "../server/routes/auth.route.js"
import messagerouter from "../server/routes/messsage.route.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use(express.json());

const dirname = path.resolve();

app.use("api/auth",authrouter);
app.use("api/message",messagerouter)




// make ready for deployment
if (process.env.NODE_ENV === "development") {
  app.use(express.static(path.join(dirname, "../client/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(dirname, "../client", "dist", "index.html"));
  });
}
// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/local')
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