import express from "express";
import { protect, authorize } from "../middleware/auth";
import Lecture from "../models/Lecture";
import Progress from "../models/Progress";

const router = express.Router();

// Mark lectures as completed(read)
router.post(
  "/complete/:lectureId",
  protect,
  authorize("Student"),
  async (req, res) => {
    const { lectureId } = req.params;
    try {
      const lecture = await Lecture.findById(lectureId);
      if (!lecture) {
        return res.status(404).json({ message: "Lecture not found" });
      }

      let progress = await Progress.findOne({
        student: req.user!.id,
        course: lecture.course,
      });
      if (!progress) {
        progress = new Progress({
          student: req.user!.id,
          course: lecture.course,
          completedLectures: [],
          quizScores: [],
        });
      }
      if (!progress.completedLectures.includes(lecture._id)) {
        progress.completedLectures.push(lecture._id);
      }
      await progress.save();
      res.json(progress);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

//Submit quiz
router.post(
  "/quiz/:lectureId",
  protect,
  authorize("Student"),
  async (req, res) => {
    const { lectureId } = req.params;
    const { answers } = req.body;
    try {
      const lecture = await Lecture.findById(lectureId);
      if (!lecture || lecture.type !== "quiz") {
        return res.status(404).json({ message: "Quiz not found" });
      }
      let score = 0;
      lecture.quizQuestions!.forEach((q, i) => {
        if (answers[i] === q.correctAnswer) score++;
      });
      const percentage = (score / lecture.quizQuestions!.length) * 100;
      const passed = percentage >= 70;

      let progress = await Progress.findOne({
        student: req.user!.id,
        course: lecture.course,
      });
      if (!progress) {
        progress = new Progress({
          student: req.user!.id,
          course: lecture.course,
          completedLectures: [],
          quizScores: [],
        });
      }
      progress.quizScores.push({
        lecture: lecture._id,
        score: percentage,
        passed,
      });
      if (passed && !progress.completedLectures.includes(lecture._id)) {
        progress.completedLectures.push(lecture._id);
      }

      await progress.save();
      res.json({ score: percentage, passed, progress });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Student Progress Get!!
router.get("/:courseId", protect, authorize("Student"), async (req, res) => {
  try {
    const progress = await Progress.findOne({
      student: req.user!.id,
      course: req.params.courseId,
    });
    res.json(progress || { completedLectures: [], quizScores: [] });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
export default router;