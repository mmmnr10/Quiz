import { useTrivia } from '../context/QuizContext';
import Questions from '../components/Questions';
import LoadingPage from './loading';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Results from '../components/Results';

const QuizPage = () => {
  const { fetchQuestions, isLoading, questions, currentQuestionIndex } =
      useTrivia(),
    router = useRouter();

  useEffect(() => {
    const navigationType = performance.getEntriesByType('navigation')[0]?.type;

    if (navigationType === 'reload') {
      router.push('/');
      return;
    }

    fetchQuestions();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  // Kontrollera om frågor är tomma
  if (!questions.length) {
    return <p className='text-center text-gray-600'>No questions available.</p>;
  }

  const quizCompleted = currentQuestionIndex >= questions.length;

  return <div>{quizCompleted ? <Results /> : <Questions />}</div>;
};

export default QuizPage;
