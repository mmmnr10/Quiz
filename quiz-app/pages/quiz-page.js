import { useEffect } from 'react';
import { useTrivia } from '../context/QuizContext';
import Questions from '../components/Questions';
import Results from '../components/Results';

const QuizPage = () => {
    const { fetchQuestions, questions, currentQuestionIndex } = useTrivia();

    useEffect(() => {
        fetchQuestions();
    }, []);

    // Kontrollera om frågor är tomma
    if (!questions.length) {
        return <p className="text-center text-gray-600">No questions available.</p>;
    }

    const quizCompleted = currentQuestionIndex >= questions.length;

    return (
        <div>
            {quizCompleted ? <Results /> : <Questions />}
        </div>
    );
};

export default QuizPage;