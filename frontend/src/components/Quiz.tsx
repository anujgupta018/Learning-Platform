import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { AuthContext } from "../context/AuthContext";
import API from "@/api/axios";

type Question = {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
};

export default function Quiz() {
  const { id } = useParams(); // quiz id from URL
  const { user } = useContext(AuthContext);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch quiz
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await API.get(`/quiz/${id}`);
        setQuestions(res.data.questions);
      } catch (err: any) {
        console.error(
          "Error loading quiz:",
          err.response?.data?.message || err.message
        );
        alert("Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleAnswerChange = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post(`/quiz/${id}/submit`, { answers });
      setScore(res.data.score);
    } catch (err: any) {
      console.error(
        "Error submitting quiz:",
        err.response?.data?.message || err.message
      );
      alert("Failed to submit quiz");
    }
  };

  if (loading)
    return <div className="text-white text-center mt-20">Loading quiz...</div>;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-6 text-white">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 space-y-8">
        <h1 className="text-3xl font-bold text-center">Quiz</h1>

        {questions.length === 0 ? (
          <p className="text-center text-white/70">No questions available.</p>
        ) : (
          <>
            {questions.map((q, index) => (
              <div key={q.id} className="space-y-3">
                <p className="font-semibold text-lg">
                  {index + 1}. {q.text}
                </p>
                <div className="flex flex-col gap-2">
                  {q.options.map((opt, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={answers[q.id] === idx}
                        onChange={() => handleAnswerChange(q.id, idx)}
                        className="accent-purple-600"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <Button
              className="w-full bg-white text-purple-900 hover:bg-gray-100 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={handleSubmit}
            >
              Submit Quiz
            </Button>

            {score !== null && (
              <div className="text-center text-white/80 mt-4">
                <h2 className="text-xl font-bold">Your Score: {score}%</h2>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
