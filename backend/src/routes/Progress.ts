import express from "express";
import { protect, authorize } from "../middleware/auth";
import Lecture from "../models/Lecture";
import Progress from "../models/Progress";

const router = express.Router();

router.get("/:courseId", protect, authorize("Student"), async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const lectures = await Lecture.find({ course: courseId });
    const progress = await Progress.findOne({
      student: req.user!.id,
      course: courseId,
    });

    const completedLectures = progress?.completedLectures || [];
    const totalLectures = lectures.length;

    res.json({
      completedLectures,
      totalLectures,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
