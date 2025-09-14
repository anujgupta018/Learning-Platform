import express from "express";
import { protect, authorize } from "../middleware/auth";
import Course from "../models/Course";

const router = express.Router();

router.post("/", protect, authorize("Instructor"), async (req, res) => {
  const { title, description } = req.body;
  try {
    const course = new Course({
      title,
      description,
      instructor: req.user!.id,
    });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    console.error("Create course error:", err);
    res.status(500).json({ message: "Server Error" });
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
      console.error("Get courses error:", err);
      res.status(500).json({ message: "Server Error" });
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
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (err) {
      console.error("Get course error:", err);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

export default router;
//68c649f138cc8de95fce48a3