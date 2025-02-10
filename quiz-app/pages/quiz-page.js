import { useEffect, useState } from 'react';
import { useTrivia } from '../context/QuizContext';
import Questions from '../components/Questions';
import LoadingPage from './loading';
import { useRouter } from 'next/router';
import Results from '../components/Results';
import SettingsForm from '../components/SettingsForm';

const QuizPage = () => {
  const { fetchQuestions, questions, currentQuestionIndex, playerSettings } =
    useTrivia();
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (quizStarted) {
      fetchQuestions(playerSettings);
    }
  }, [quizStarted]);

  // If quiz hasn't started, show settings form
  if (!quizStarted) {
    return <SettingsForm startQuiz={() => setQuizStarted(true)} />;
  }

  // Kontrollera om frågor är tomma
  if (!questions.length) {
    return <p className='text-center text-gray-600'>No questions available.</p>;
  }

  const quizCompleted = currentQuestionIndex >= questions.length;

  return <div>{quizCompleted ? <Results /> : <Questions />}</div>;
};

export default QuizPage;
