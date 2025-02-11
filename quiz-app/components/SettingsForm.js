import { useEffect, useState } from "react";
import { useTrivia } from "../context/QuizContext";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import LoadingPage from "../pages/loading";
import { Loader } from "lucide-react";
import MotionDiv from "./motion-div";

export default function SettingForm() {
  const {
    fetchQuestions,
    quizStarted,
    loading,
    loadingCategories,
    categories,
    setQuizStarted,
  } = useTrivia();
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const route = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      setQuizStarted(false);
    }
  }, [pathname]);

  const handleSelection = async (e) => {
    e.preventDefault();

    await fetchQuestions({ category, difficulty });

    route.push("/quiz-page");
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <MotionDiv>
      {!quizStarted && (
        <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
            Quiz Settings
          </h2>
          <form onSubmit={handleSelection}>
            <label className="block mb-3 text-lg font-medium text-gray-900">
              Category:
            </label>
            {loadingCategories && (
              <Loader className="w-6 h-6 text-blue-500 animate-spin mx-auto" />
            )}

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border rounded-lg mb-5  focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loadingCategories}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <label className="block mb-3 text-lg font-medium text-gray-900">
              Difficulty:
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-3 border rounded-lg mb-6  focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <Button
              type="submit"
              className="w-full"
            >
              Start Quiz
            </Button>
          </form>
        </div>
      )}
    </MotionDiv>
  );
}
