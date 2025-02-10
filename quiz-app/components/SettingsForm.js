import { useState } from 'react';
import { useTrivia } from '../context/QuizContext';
import QuizPage from '../pages/quiz-page';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import LoadingPage from '../pages/loading';

export default function SettingForm() {
  const { fetchQuestions, quizStarted, loading } = useTrivia();
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const route = useRouter();

  const handleSelection = async (e) => {
    e.preventDefault();

    await fetchQuestions({ category, difficulty });

    route.push('/quiz-page');
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div>
      {!quizStarted && (
        <div className='max-w-md mx-auto p-6 rounded-lg shadow-lg border'>
          <h2 className='text-xl font-semibold text-center mb-4'>
            Quiz Setting
          </h2>
          <form onSubmit={handleSelection}>
            <label className='block mb-2 font-medium'>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='w-full p-2 border rounded-lg mb-4'
            >
              <option value=''>Any</option>
              <option value='9'>General Knowledge</option>
              <option value='18'>Science: Computers</option>
              <option value='23'>History</option>
              <option value='21'>Sports</option>
            </select>

            <label className='block mb-2 font-medium'>Difficulty:</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className='w-full p-2 border rounded-lg mb-4'
            >
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </select>

            <Button type='submit' className='w-full'>
              Start Quiz
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
