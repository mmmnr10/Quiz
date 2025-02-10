"use client";
import { useTrivia } from "../context/QuizContext"; // Importera QuizContext
import { usePlayerContext } from "../pages/api/PlayerContext"; // Importera PlayerContext
import { useEffect } from "react";
import { useRouter } from "next/router"; // Importera useRouter
import { Button } from "./ui/button";

export default function Results() {
  const { questions, resetGame, score, userAnswers } = useTrivia(); // Hämta userAnswers från TriviaContext
  const { playerName, addHighScore } = usePlayerContext(); // Hämta spelardata från PlayerContext
  const router = useRouter(); // Använd useRouter för routning

  // Spara högsta poäng när komponenten renderas
  useEffect(() => {
    if (playerName && score > 0) {
      addHighScore(playerName, score); // Spara spelarens namn och poäng
    }
  }, [playerName, score, addHighScore]);

  // Hantera "Restart Quiz"-knappen
  const handleRestartQuiz = () => {
    resetGame(); // Återställ quizet
    router.push("/"); // Omdirigera till quiz-sidan
  };

  return (
    <div className="max-w-4xl mx-auto m-10 p-12 bg-gray-800 text-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-semibold text-center mb-6">Quiz Results</h2>

      <p className="text-center text-lg text-gray-400">
        You answered <span className="font-bold text-green-400">{score}</span>{" "}
        out of{" "}
        <span className="font-bold text-green-400">{questions.length}</span>{" "}
        questions correctly.
      </p>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-6 text-center text-gray-100">
          Your Answers:
        </h3>
        {questions.map((question, index) => (
          <div
            key={index}
            className="bg-gray-700 p-4 rounded-lg shadow-sm mb-6"
          >
            <p className="font-medium text-lg">{question.question}</p>
            <p className="text-gray-300">
              Your answer:
              <span
                className={
                  userAnswers[index] === question.correct_answer
                    ? "text-green-500 font-semibold"
                    : "text-red-500 font-semibold"
                }
              >
                {userAnswers[index]}
              </span>
              {userAnswers[index] === question.correct_answer ? (
                <span className="text-green-400 font-semibold"> (Correct)</span>
              ) : (
                <span className="text-red-400 font-semibold"> (Incorrect)</span>
              )}
            </p>
            <p className="text-gray-300">
              Correct answer:
              <span className="font-bold text-yellow-400">
                {question.correct_answer}
              </span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button
          onClick={handleRestartQuiz}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
        >
          Restart Quiz
        </Button>
      </div>
    </div>
  );
}
