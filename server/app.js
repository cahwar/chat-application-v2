import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";

import userRoutes from "./routes/userRoutes.js";
import connectToDb from "./configs/dbConnect.js";

dotenv.config();
connectToDb();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use("/user", userRoutes);
app.get("/", (req, res) => res.send("Okay"));
app.use((err, req, res, next) => {
    console.log("Error occured");
    console.log(err.message);
    res.json({
        errorMessage: err.message,
    });
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`Server launched on port ${port}`);
});