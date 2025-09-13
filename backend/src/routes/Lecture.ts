import express from "express";
import { authorize, protect } from "../middleware/auth";
import Course from "../models/Course";
import Lecture from "../models/Lecture";

const router = express.Router();

//Add lecture to course ->>> For Instructor
router.post(
  "/:courseId",
  protect,
  authorize("Instructor"),
  async (req, res) => {
    const { title, type, content, quizQuestions } = req.body;
    try {
      const course = await Course.findById(req.params.courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      const lecture = new Lecture({
        course: course._id,
        title,
        type,
        content,
        quizQuestions,
      });
      await lecture.save();

      course.lectures.push(lecture._id);
      await course.save();

      res.status(201).json({ message: "Lecture added successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);
export default router;
