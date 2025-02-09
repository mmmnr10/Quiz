import { useTrivia } from '../context/QuizContext';
import Questions from '../components/Questions';
import LoadingPage from './loading';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const QuizPage = () => {
  const { fetchQuestions, isLoading } = useTrivia(),
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

  return (
    <div>
      <Questions />
    </div>
  );
};

export default QuizPage;
