import express from "express";
import { protect, authorize } from "../middleware/auth";
import Lecture from "../models/Lecture";
import Course from "../models/Course";

const router = express.Router();

router.post("/", protect, authorize("Instructor"), async (req, res) => {
  const { title, description } = req.body;
  try {
    const course = new Course({
      title,
      description,
      instructor: req.user!._id,
    });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: `Server Error` });
  }
});

router.get(
  "/",
  protect,
  authorize("Instructor", "Student"),
  async (req, res) => {
    try {
      const courses = await Course.find().populate("instructor", "name email");
      res.json(courses);
    } catch (err) {
      res.status(500).json({ message: `Server Error` });
    }
  }
);

router.get(
  "/:id",
  protect,
  authorize("Instructor", "Student"),
  async (req, res) => {
    try {
      const course = await Course.findById(req.params.id).populate("lectures");
      if (!course) return res.status(404).json({ message: "Course not found" });
      res.json(course);
    } catch (err) {
      res.status(500).json({ message: `Server Error` });
    }
  }
);
export default router;
