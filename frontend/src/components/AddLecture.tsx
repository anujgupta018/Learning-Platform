import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { AuthContext } from "../context/AuthContext";
import API from "@/api/axios";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

export default function AddLecture() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [isQuiz, setIsQuiz] = useState(false);
  const [content, setContent] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    { question: "", options: ["", ""], correctIndex: 0 },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", ""], correctIndex: 0 },
    ]);
  };

  const handleSubmit = async () => {
    if (!title.trim()) return alert("Title is required");
    if (
      isQuiz &&
      questions.some(
        (q) => !q.question.trim() || q.options.some((o) => !o.trim())
      )
    )
      return alert("All quiz questions and options must be filled");

    const payload: any = { title, type: isQuiz ? "quiz" : "reading" };
    if (isQuiz) {
      payload.quizQuestions = questions.map((q) => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.options[q.correctIndex],
      }));
    } else {
      payload.content = content;
    }

    try {
      await API.post(`/lectures/${courseId}`, payload);
      alert("Lecture added successfully!");
      navigate(`/courses/${courseId}`);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add lecture");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-800 via-indigo-800 to-blue-900 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8 md:p-12 space-y-8 flex flex-col">
        <h2 className="text-4xl font-bold text-center text-white mb-6">
          Add Lecture
        </h2>

        <Input
          placeholder="Lecture Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-white placeholder-white/60 bg-white/10 border border-white/20 focus:border-purple-400 focus:bg-white/20 focus:ring-0 rounded-xl px-4 py-3"
        />

        <div className="flex items-center justify-center gap-4">
          <span className="text-white font-medium">Reading</span>
          <Switch
            checked={isQuiz}
            onCheckedChange={setIsQuiz}
            className="bg-white data-[state=checked]:bg-yellow-500"
          />
          <span className="text-white font-medium">Quiz</span>
        </div>

        {!isQuiz && (
          <Textarea
            placeholder="Enter content or link here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="text-white placeholder-white/60 bg-white/10 border border-white/20 focus:border-purple-400 focus:bg-white/20 focus:ring-0 rounded-xl px-4 py-3 h-48"
          />
        )}

        {isQuiz && (
          <div className="space-y-6">
            {questions.map((q, index) => (
              <div
                key={index}
                className="bg-white/10 p-6 rounded-2xl border border-white/20 shadow-md space-y-4"
              >
                <Input
                  placeholder="Question text"
                  value={q.question}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[index].question = e.target.value;
                    setQuestions(newQuestions);
                  }}
                  className="text-white placeholder-white/60 bg-white/10 border border-white/20 focus:border-purple-400 focus:bg-white/20 focus:ring-0 rounded-xl px-4 py-3"
                />
                {q.options.map((opt, optIndex) => (
                  <Input
                    key={optIndex}
                    placeholder={`Option ${optIndex + 1}`}
                    value={opt}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[index].options[optIndex] = e.target.value;
                      setQuestions(newQuestions);
                    }}
                    className="text-white placeholder-white/60 bg-white/10 border border-white/20 focus:border-purple-400 focus:bg-white/20 focus:ring-0 rounded-xl px-4 py-3"
                  />
                ))}

                <select
                  value={q.correctIndex}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[index].correctIndex = parseInt(e.target.value);
                    setQuestions(newQuestions);
                  }}
                  className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/20 focus:border-purple-400"
                >
                  {q.options.map((_, optIndex) => (
                    <option key={optIndex} value={optIndex}>
                      Correct Answer {optIndex + 1}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <Button
              onClick={handleAddQuestion}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl py-3 shadow-lg transition-all duration-300"
            >
              Add Another Question
            </Button>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-xl py-4 text-lg shadow-xl transition-all duration-300"
        >
          Submit Lecture
        </Button>
      </div>
    </div>
  );
}
