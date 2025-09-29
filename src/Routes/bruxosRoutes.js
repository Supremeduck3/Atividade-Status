import express from "express";
import {createBruxo, getAllbruxos, getBruxosByid,deleteBruxo} from "../Controllers/bruxosControllers.js"

const router = express.Router();

router.get("/", getAllbruxos);
router.get("/:id", getBruxosByid);
router.post("/", createBruxo);
router.delete("/:id",deleteBruxo)

export default router