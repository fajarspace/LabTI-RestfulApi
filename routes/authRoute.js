import express from "express";
import { Login, logOut, Profile } from "../controllers/Auth.js";

const router = express.Router();

router.get('/profile', Profile);
router.post('/login', Login);
router.delete('/logout', logOut);

export default router;