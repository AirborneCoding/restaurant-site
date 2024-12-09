import express from "express";
const router = express.Router();

import { authenticateUser, authorizePermissions } from "../middleware/authentication.js";

import {
    register,
    login,
    // verifyEmail,
    logout,
    forgotPassword,
    resetPassword,
    deleteUser
} from "../controllers/auth.controller.js";

router.post('/register', register);
router.post('/login', login);
router.delete('/logout', authenticateUser, logout);
// router.post('/verify-email', verifyEmail);
router.post('/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);

// !not there this was just test
router.delete('/:id', deleteUser);

export default router