import express, { Request, Response } from "express";
import { authorize, protect } from "../middleware/auth";
import Course from "../models/Course";
import Lecture from "../models/Lecture";

const router = express.Router();

/**
 * ROUTE: POST /api/lectures/:courseId
 * DESC: Add a lecture to a course (Instructor only)
 */
router.post(
  "/:courseId",
  protect,
  authorize("Instructor"),
  async (req: Request, res: Response) => {
    const { title, type, content, quizQuestions } = req.body;

    try {
      const course = await Course.findById(req.params.courseId);
      if (!course) return res.status(404).json({ message: "Course not found" });

      if (course.instructor.toString() !== req.user?.id) {
        return res
          .status(403)
          .json({ message: "Not authorized to add lectures to this course" });
      }

      if (!["reading", "quiz"].includes(type)) {
        return res.status(400).json({ message: "Invalid lecture type" });
      }

      if (!title || title.trim() === "") {
        return res.status(400).json({ message: "Title is required" });
      }

      if (
        type === "quiz" &&
        (!Array.isArray(quizQuestions) || quizQuestions.length === 0)
      ) {
        return res
          .status(400)
          .json({ message: "Quiz questions required for quiz type" });
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

      res.status(201).json({ message: "Lecture added successfully", lecture });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/**
 * ROUTE: GET /api/lectures/course/:courseId
 * DESC: Get all lectures for a course (Instructor & Student)
 * NOTE: Must come before "/:id" route to avoid route conflicts
 */
router.get(
  "/course/:courseId",
  protect,
  authorize("Instructor", "Student"),
  async (req: Request, res: Response) => {
    try {
      const lectures = await Lecture.find({ course: req.params.courseId });
      if (!lectures || lectures.length === 0) {
        return res
          .status(404)
          .json({ message: "No lectures found for this course" });
      }
      res.json(lectures);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/**
 * ROUTE: GET /api/lectures/:id
 * DESC: Get a single lecture by ID (Instructor & Student)
 */
router.get(
  "/:id",
  protect,
  authorize("Instructor", "Student"),
  async (req: Request, res: Response) => {
    try {
      const lecture = await Lecture.findById(req.params.id).populate("course");
      if (!lecture)
        return res.status(404).json({ message: "Lecture not found" });
      res.json(lecture);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/**
 * ROUTE: PATCH /api/lectures/:lectureId
 * DESC: Update a lecture (Instructor only)
 */
router.patch(
  "/:lectureId",
  protect,
  authorize("Instructor"),
  async (req: Request, res: Response) => {
    try {
      const lecture = await Lecture.findById(req.params.lectureId);
      if (!lecture)
        return res.status(404).json({ message: "Lecture not found" });

      const course = await Course.findById(lecture.course);
      if (!course) return res.status(404).json({ message: "Course not found" });

      if (course.instructor.toString() !== req.user?.id) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this lecture" });
      }

      const { title, type, content, quizQuestions } = req.body;
      if (title) lecture.title = title;
      if (type) lecture.type = type;
      if (content) lecture.content = content;
      if (quizQuestions) lecture.quizQuestions = quizQuestions;

      await lecture.save();
      res.json({ message: "Lecture updated successfully", lecture });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/**
 * ROUTE: DELETE /api/lectures/:lectureId
 * DESC: Delete a lecture (Instructor only)
 */
router.delete(
  "/:lectureId",
  protect,
  authorize("Instructor"),
  async (req: Request, res: Response) => {
    try {
      const lecture = await Lecture.findById(req.params.lectureId);
      if (!lecture)
        return res.status(404).json({ message: "Lecture not found" });

      const course = await Course.findById(lecture.course);
      if (!course) return res.status(404).json({ message: "Course not found" });

      if (course.instructor.toString() !== req.user?.id) {
        return res
          .status(403)
          .json({ message: "Not authorized to delete this lecture" });
      }

      // Remove lecture from course
      course.lectures = course.lectures.filter(
        (id) => id.toString() !== lecture._id.toString()
      );
      await course.save();

      // Delete lecture
      await lecture.deleteOne(); // <-- use deleteOne instead of remove
      res.json({ message: "Lecture deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
