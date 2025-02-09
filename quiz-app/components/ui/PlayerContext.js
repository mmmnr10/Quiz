import React, { createContext, useState, useContext, useEffect } from "react";

// Skapa kontext för spelaren
const PlayerContext = createContext();

export const usePlayerContext = () => {
  return useContext(PlayerContext);
};

export const PlayerProvider = ({ children }) => {
  const [playerName, setPlayerName] = useState("");
  const [highScores, setHighScores] = useState([]);

  // Hämta high scores från localStorage när komponenten laddas
  useEffect(() => {
    const savedHighScores =
      JSON.parse(localStorage.getItem("highScores")) || [];
    setHighScores(savedHighScores);
  }, []);

  // Lägg till ett nytt high score
  const addHighScore = (name, score) => {
    const newHighScore = { name, score };

    // Lägg till det nya high score i listan och sortera den
    const updatedHighScores = [...highScores, newHighScore].sort(
      (a, b) => b.score - a.score
    );

    // Uppdatera tillståndet och localStorage
    setHighScores(updatedHighScores);
    localStorage.setItem("highScores", JSON.stringify(updatedHighScores));
  };

  return (
    <PlayerContext.Provider
      value={{ playerName, setPlayerName, highScores, addHighScore }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
