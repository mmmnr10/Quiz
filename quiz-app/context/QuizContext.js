import { createContext, useState, useContext } from 'react';

const TriviaContext = createContext();

const url = 'https://opentdb.com/api.php';

export const TriviaProvider = ({ children }) => {
  const [adminSettings, setAdminSettings] = useState({
    numOfQuestions: 10,
    questionType: 'multiple', // boolean true / false
  });

  const [playerSettings, setPlayerSettings] = useState({
      category: '',
      difficulty: 'easy',
    }),
    [currentQuestionIndex, setCurrentQuestionIndex] = useState(0),
    [questions, setQuestions] = useState([]),
    [score, setScore] = useState(0),
    [loading, setLoading] = useState(false),
    [error, setError] = useState(null);

  const resetGame = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const fetchQuestions = async (newSettings) => {
    setLoading(true);
    setError(null);

    if (newSettings) {
      setPlayerSettings(newSettings);
    }

    const category = newSettings?.category || playerSettings.category || '',
      difficulty = newSettings?.difficulty || playerSettings.difficulty || '',
      apiUrl = `${url}?amount=${adminSettings.numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${adminSettings.questionType}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setQuestions(data.results);
      setCurrentQuestionIndex(0);
      setScore(0);

      return data.results;
    } catch (error) {
      setError(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const answerQuestion = (answer) => {
    if (questions[currentQuestionIndex].correct_answer === answer) {
      setScore((prev) => prev + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const updateAdminSettings = (newSettings) => {
    setAdminSettings((prevSettings) => ({
      ...prevSettings, // Keep previous settings
      ...newSettings, // Override with new settings
    }));
  };

  return (
    <TriviaContext.Provider
      value={{
        resetGame,
        fetchQuestions,
        questions,
        currentQuestionIndex,
        score,
        adminSettings,
        playerSettings,
        setPlayerSettings,
        setAdminSettings,
        updateAdminSettings,
        answerQuestion,
        loading,
        error,
      }}
    >
      {children}
    </TriviaContext.Provider>
  );
};

export const useTrivia = () => useContext(TriviaContext);
