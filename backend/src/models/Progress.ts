import mongoose, { Schema, Document } from 'mongoose';

export interface IProgress extends Document {
  student: mongoose.Schema.Types.ObjectId;
  course: mongoose.Schema.Types.ObjectId;
  completedLectures: mongoose.Schema.Types.ObjectId[]; // array of lecture IDs
  quizScores: {
    lecture: mongoose.Schema.Types.ObjectId;
    score: number;
    passed: boolean;
  }[];
}

const progressSchema: Schema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  completedLectures: [{ type: Schema.Types.ObjectId, ref: 'Lecture' }],
  quizScores: [{
    lecture: { type: Schema.Types.ObjectId, ref: 'Lecture' },
    score: Number,
    passed: Boolean,
  }],
}, { timestamps: true });

export default mongoose.model<IProgress>('Progress', progressSchema);
