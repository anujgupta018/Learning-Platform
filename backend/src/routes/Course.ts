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

router.delete("/:id", protect, authorize("Instructor"), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "No Course" });
    }
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course Deleted" });
  } catch (err) {
    console.log(err);
  }
});
export default router;
//68c649f138cc8de95fce48a3
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Y2FhMGIwMjlhMzQxNmVlMjZhMTg2YSIsInJvbGUiOiJJbnN0cnVjdG9yIiwiaWF0IjoxNzU4MTA5ODcyLCJleHAiOjE3NTgxOTYyNzJ9.WNGL1rdEYGAqG1fyow9dDLNGvRG_eA76_WA__SRUR5w
