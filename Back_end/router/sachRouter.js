import { Router } from "express";
import express from "express";
import {
  createSach,
  deleteSach,
  getAllSach,
  getDetailSach,
  updateSach,
} from "../controllers/sachControllers";

const router = express.Router();

router.post("/", createSach);
router.get("/", getAllSach);
router.get("/:id", getDetailSach);
router.put("/:id", updateSach);
router.delete("/:idSach", deleteSach);

export default router;
