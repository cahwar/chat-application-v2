import express from "express";
import { checkAccess, loginUser, registerUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/access", checkAccess);

export default router;