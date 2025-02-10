import { createContext, useState, useContext, useEffect } from 'react';

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
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]); // Ny state för användarens svar
  const [quizStarted, setQuizStarted] = useState(false);

  const resetGame = () => {
    setQuizStarted(false); //Reset quiz when game restarts
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0); // Återställ score till 0
    setUserAnswers([]); // Återställ användarens svar
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
      console.log('status: ' + response.status);
      console.log('text: ' + response.text);
      console.log('json: ' + response.json);
      const data = await response.json();
      console.log('data: ' + data);

      if (!response.ok) {
        // console.log("response: " + data);
        throw new Error(data.message || 'Something went wrong');
      }

      setQuestions(data.results);
      setCurrentQuestionIndex(0);
      setScore(0); // Återställ score när nya frågor hämtas
      setUserAnswers([]); // Återställ användarens svar
      setQuizStarted(true);

      return data.results;
    } catch (error) {
      setError(error);
      console.log('error: ' + error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const answerQuestion = (answer) => {
    // Spara användarens svar
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = answer;
    setUserAnswers(updatedUserAnswers);

    // Kontrollera om svaret är korrekt och uppdatera score
    if (questions[currentQuestionIndex].correct_answer === answer) {
      setScore((prev) => prev + 1);
    }

    // Öka currentQuestionIndex även för sista frågan
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const updateAdminSettings = (newSettings) => {
    setAdminSettings((prevSettings) => {
      const updatedSettings = { ...prevSettings, ...newSettings };

      localStorage.setItem('adminSettings', JSON.stringify(updatedSettings));

      return updatedSettings;
    });
  };

  return (
    <TriviaContext.Provider
      value={{
        resetGame,
        fetchQuestions,
        questions,
        currentQuestionIndex,
        score,
        userAnswers, // Exportera userAnswers
        adminSettings,
        playerSettings,
        setPlayerSettings,
        setAdminSettings,
        answerQuestion,
        quizStarted,
        setQuizStarted,
        loading,
        error,
        updateAdminSettings,
      }}
    >
      {children}
    </TriviaContext.Provider>
  );
};

export const useTrivia = () => useContext(TriviaContext);
