import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../models/userModel.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { login, password } = req.body;
    if (!login || !password) {
        res.status(400);
        throw new Error("No login or no password provided");
    }

    const user = await userModel.findOne({ login: login });
    if (user) {
        res.status(400);
        throw new Error("User with this login is already registered in the system");
    }

    if (!(await userModel.create({ login, password: await bcrypt.hash(password, 10) }))) {
        res.status(500);
        throw new Error("Couldn't register new user");
    };

    res.status(200).json({ login });
});

export const loginUser = asyncHandler(async (req, res) => {
    const { login, password } = req.body;
    if (!login || !password) {
        res.status(400);
        throw new Error("No login or no password provided");
    }

    const user = await userModel.findOne({ login: login });
    if (!user) {
        res.status(400);
        throw new Error("User with this login does not exist in the system");
    }

    if (!(await bcrypt.compare(password, user.password))) {
        res.status(400);
        throw new Error("Wrong password");
    }

    const accessToken = jwt.sign({
        user: {
            login: user.login,
            id: user.id,
        }
    }, process.env.PRIVATE_KEY, { expiresIn: "1h" });

    res.status(200).json({
        accessToken: accessToken,
        isLogged: true,
    });
});

export const checkAccess = asyncHandler(async (req, res) => {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        console.log("No access header");
        return res.json({ isLogged: false });
    }

    const accessToken = tokenHeader.split(" ")[1];
    if (!accessToken) {
        console.log("No access token");
        return res.json({ isLogged: false });
    }

    const user = jwt.verify(accessToken, process.env.PRIVATE_KEY);

    if (user) {
        return res.json({ isLogged: true });
    } else {
        return res.json({ isLogged: false });
    }
});