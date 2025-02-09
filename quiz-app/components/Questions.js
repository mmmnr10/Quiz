import { useTrivia } from '../context/QuizContext'; 

export default function Questions() {
    const { questions, currentQuestionIndex, answerQuestion } = useTrivia();
    if (!questions.length) return <p className="text-center text-gray-600">No questions available.</p>;
    const currentQuestion = questions[currentQuestionIndex];
    console.log("Questions:", questions);
    return (    
        <div className="max-w-3xl mx-auto m-10 p-20 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-4 pb-4">{currentQuestion.question}</h2>

            <div className="grid grid-cols-2 gap-4">
                {currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer).sort().map((answer, index) => (
                <button
                    key={index}
                    className="bg-gray-700 text-white p-3 rounded-lg hover:bg-gray-500 transition-all"
                    onClick={() => answerQuestion(answer)}
                >
                    {answer}
                </button>
                ))}
        </div>

        <p className="mt-10 text-gray-500 text-sm text-center">Question {currentQuestionIndex + 1} of {questions.length}</p>
        </div>
    );
}
