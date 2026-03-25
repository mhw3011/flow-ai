import express from "express";

import { askAI, saveFlow } from "../controllers/aiController.js";

const router = express.Router();

router.post("/ask-ai", askAI);

router.post("/save", saveFlow);

export default router;
