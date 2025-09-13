import mongoose, { Schema, Document } from "mongoose";

export interface IQuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface ILecture extends Document {
  course: mongoose.Schema.Types.ObjectId;
  title: string;
  type: "reading" | "quiz";
  content?: string;
  quizQuestions?: IQuizQuestion[];
}
const lectureSchema: Schema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ["reading", "quiz"], required: true },
    content: { type: String },
    quizQuestions: [
      {
        question: { type: String },
        options: [{ type: String }],
        correctAnswer: { type: String },
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model<ILecture>("Lecture",lectureSchema)