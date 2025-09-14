import express from "express";
import { protect, authorize } from "../middleware/auth";
import Lecture from "../models/Lecture";
import Progress from "../models/Progress";

const router = express.Router();

router.get("/:lectureId", protect, authorize("Student"), async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.lectureId);

    if (!lecture || lecture.type !== "quiz") {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json({
      lectureId: lecture._id,
      title: lecture.title,
      questions: lecture.quizQuestions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.post(
  "/:lectureId/submit",
  protect,
  authorize("Student"),
  async (req, res) => {
    try {
      const { answers } = req.body;
      const lecture = await Lecture.findById(req.params.lectureId);

      if (!lecture || lecture.type !== "quiz") {
        return res.status(404).json({ message: "Quiz not found" });
      }

      let score = 0;
      lecture.quizQuestions.forEach((q, i) => {
        if (answers[i] === q.correctAnswer) score++;
      });

      const percentage = (score / lecture.quizQuestions.length) * 100;
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
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
