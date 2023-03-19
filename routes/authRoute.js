import express from "express";
import { Login, logOut, Profile } from "../controller/auth.js";

const router = express.Router();

router.get('/profile', Profile);
router.post('/login', Login);
router.delete('/logout', logOut);

export default router;