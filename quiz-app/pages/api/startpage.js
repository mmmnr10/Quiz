import Link from "next/link";

const StartPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 text-white">
      <div className="text-center p-6 rounded-lg shadow-xl bg-opacity-90 backdrop-blur-md">
        <h1 className="text-5xl font-semibold mb-6 text-white drop-shadow-md">
          Välkommen till Trivia Quizet!
        </h1>
        <Link href="/triviaQuiz">
          <a className="bg-blue-600 text-white py-4 px-10 rounded-lg hover:bg-blue-500 transition transform hover:scale-105 ease-in-out duration-300">
            Starta Trivia Quizet
          </a>
        </Link>
      </div>
    </div>
  );
};

export default StartPage;
