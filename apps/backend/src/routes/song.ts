import { Router } from "express";
import { SongController } from "../controllers/songController";

const router = Router();

// CRUD routes
router.post("/", SongController.createSong);
router.get("/", SongController.getAllSongs);
router.get("/stats", SongController.getStatistics);
router.get("/:id", SongController.getSongById);
router.put("/:id", SongController.updateSong);
router.delete("/:id", SongController.deleteSong);

export default router;
