import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  instructor: mongoose.Schema.Types.ObjectId;
  lectures: mongoose.Schema.Types.ObjectId[];
}

const courseSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    lectures: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],
  },
  { timestamps: true }
);

export default mongoose.model<ICourse>("Course", courseSchema);
