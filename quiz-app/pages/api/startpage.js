import Link from "next/link";

const StartPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-6">Välkommen till Quizet!</h1>
      <Link href="/quiz">
        <a className="bg-blue-500 text-white py-3 px-8 rounded-lg hover:bg-blue-400 transition">
          Starta Quizet
        </a>
      </Link>
    </div>
  );
};

export default StartPage;
