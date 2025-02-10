import { useState } from 'react';
import { useTrivia } from '../context/QuizContext';
import QuizPage from '../pages/quiz-page';

export default function SettingForm() {
  const { setPlayerSettings, fetchQuestions, quizStarted } = useTrivia();
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('easy');

  const handleSelection = (e) => {
    e.preventDefault();
    setPlayerSettings({ category, difficulty });
    fetchQuestions({ category, difficulty });
  };

  return (
    <div>
      {!quizStarted && (
        <div className='max-w-md mx-auto p-6 rounded-lg shadow-lg'>
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

            <button
              type='submit'
              className='w-full bg-gray-700  p-3 rounded-lg hover:bg-gray-600 transition-all'
            >
              Start Quiz
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
