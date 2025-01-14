import express from "express";
import {  register, getMyDetails, login, logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

export const router = express.Router();


router.post("/register", register);
router.post("/login", login)
router.get("/logout", logout)

router.get("/me", isAuthenticated, getMyDetails)

// router.get("/userid/:id", getUserDetails)

// router.put("/userid/:id", updateUser)

// router.delete("/userid/:id", deleteUser)

export default router;