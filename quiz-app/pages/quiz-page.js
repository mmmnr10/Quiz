import { useEffect } from 'react';
import { useTrivia } from '../context/QuizContext';
import Questions from '../components/Questions';

const QuizPage = () => {
  const { fetchQuestions } = useTrivia();

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div>
      <Questions />
    </div>
  );
};

export default QuizPage;