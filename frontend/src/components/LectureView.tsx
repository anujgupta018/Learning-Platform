import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Lecture {
  _id: string;
  title: string;
  type: string;
  content?: string;
  quizQuestions?: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}

export default function LectureView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lecture, setLecture] = useState<Lecture | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/lectures/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLecture(data);
        if (data.quizQuestions) {
          setAnswers(Array(data.quizQuestions.length).fill(""));
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  const markCompleted = () => {
    fetch(`http://localhost:5000/api/user/complete/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        alert("Lecture marked as completed!");
        navigate(-1); // Go back
      })
      .catch((err) => console.error(err));
  };

  if (!lecture) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold text-purple-600">{lecture.title}</h1>
      {lecture.type === "reading" ? (
        <div>
          <p className="mt-4 text-gray-700">{lecture.content}</p>
          <button
            onClick={markCompleted}
            className="mt-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Mark as Completed
          </button>
        </div>
      ) : (
        <div>
          <h2 className="mt-4 text-lg font-semibold">Quiz</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitQuiz();
            }}
            className="space-y-4 mt-4"
          >
            {lecture.quizQuestions!.map((q, index) => (
              <div key={index} className="p-4 border rounded">
                <p className="font-medium">{q.question}</p>
                {q.options.map((option, idx) => (
                  <label key={idx} className="block mt-1">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={() =>
                        setAnswers((prev) => {
                          const updated = [...prev];
                          updated[index] = option;
                          return updated;
                        })
                      }
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))}
            <button
              type="submit"
              disabled={submitted}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-400"
            >
              Submit Quiz
            </button>
          </form>
          {submitted && (
            <div className="mt-4 p-4 bg-green-100 rounded text-green-800">
              <p>Score: {score}%</p>
              <p>{score! >= 70 ? "Passed " : "Failed "}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
