import { Router } from "express";
import { aiChat } from "../controllers/aichat.js";


const router = Router();
router.post("/aichat", aiChat);

export default router;