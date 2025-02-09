import { createContext, useState, useContext, useEffect } from 'react';

const TriviaContext = createContext();

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
    [isLoading, setLoading] = useState(false),
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

    const url = `/api/trivia?numOfQuestions=${
      adminSettings.numOfQuestions
    }&category=${
      newSettings?.category || playerSettings.category || ''
    }&difficulty=${
      newSettings?.difficulty || playerSettings.difficulty || ''
    }&questionType=${adminSettings.questionType}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch: ${errorMessage}`);
      }

      const data = await response.json();

      setQuestions(data);
      setCurrentQuestionIndex(0);
      setScore(0);
      return data;
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
    setAdminSettings((prevSettings) => {
      const updatedSettings = { ...prevSettings, ...newSettings };

      localStorage.setItem('adminSettings', JSON.stringify(updatedSettings));

      return updatedSettings;
    });
  };

  useEffect(() => {
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      setAdminSettings(JSON.parse(savedSettings));
    }
  }, []);

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
        isLoading,
        error,
      }}
    >
      {children}
    </TriviaContext.Provider>
  );
};

export const useTrivia = () => useContext(TriviaContext);
