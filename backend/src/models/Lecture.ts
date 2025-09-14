import mongoose, { Schema, Document } from "mongoose";


export interface IQuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; 
}

export interface ILecture extends Document {
  course: mongoose.Schema.Types.ObjectId;
  title: string;
  type: "reading" | "quiz";
  content?: string;
  quizQuestions?: IQuizQuestion[];
}

const quizQuestionSchema: Schema = new Schema(
  {
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true },
  },
  { _id: false }
);

const lectureSchema: Schema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ["reading", "quiz"], required: true },
    content: { type: String },
    quizQuestions: [quizQuestionSchema],
  },
  { timestamps: true }
);

export default mongoose.model<ILecture>("Lecture", lectureSchema);
