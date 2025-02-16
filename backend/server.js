import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5001;

dotenv.config();

// Middleware to parse JSON requests
app.use(express.json());

app.use("/api/auth", authRoutes);


// app.get("/", (req, res) => {
//     res.send("Helloooo World!!!");
// });

app.listen(PORT, async () => {
    await connectToMongoDB();
    console.log(`Server is Running on port ${PORT}`);
});