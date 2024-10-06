import { createContext, useContext, useState } from "react";

const AppContext = createContext({
  category: undefined,
  difficulty: 0,
  setCategory: (x) => {},
  setDifficulty: (y) => {},
  history: [],
  setHistory: (z) => {},
});

export const AppContextProvider = ({ children }) => {
  const [category, setCategory] = useState();
  const [difficulty, setDifficulty] = useState(0);
  const [history, setHistory] = useState([]);
  return (
    <AppContext.Provider
      value={{
        category,
        difficulty,
        setCategory,
        setDifficulty,
        history,
        setHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
