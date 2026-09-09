import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import { connectToSocket } from "./src/controllers/socketManager.js";
import userRoutes from "./src/routes/usersRoutes.js";

dotenv.config();

const app = express();
const server = createServer(app);

// ==============================
// SOCKET CONNECTION
// ==============================

connectToSocket(server);

// ==============================
// PORT
// ==============================

const PORT = process.env.PORT || 5000;

// ==============================
// CORS
// ==============================

const allowedOrigins = [
  "http://localhost:5173",
  "https://meet-flow-tawny.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an origin
      // (for example Postman/server-to-server requests)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

// ==============================
// BODY PARSER
// ==============================

app.use(express.json({ limit: "40kb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "40kb",
  }),
);

// ==============================
// TEST ROUTE
// ==============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MeetFlow Backend is running",
  });
});

// ==============================
// USER ROUTES
// ==============================

app.use("/api/users", userRoutes);

// ==============================
// DATABASE CONNECTION
// ==============================

const connectDatabase = async () => {
  try {
    const connectionDb = await mongoose.connect(process.env.MONGODB_URI);

    console.log(
      `MongoDB Connected Successfully: ${connectionDb.connection.host}`,
    );
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);

    console.log("⚠️ Server is running, but MongoDB is not connected.");
  }
};

// ==============================
// START SERVER
// ==============================

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// ==============================
// CONNECT DATABASE
// ==============================

connectDatabase();

// ==============================
// DATABASE EVENTS
// ==============================

mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB connection established");
});

mongoose.connection.on("error", (error) => {
  console.error("❌ MongoDB Error:", error.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected");
});