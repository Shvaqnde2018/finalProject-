import { createContext, useContext, useState, useEffect } from 'react';
import { initialWords } from '../data/initialWords';

const WordsContext = createContext();

const loadFromStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

export function WordsProvider({ children }) {
  const [words, setWords] = useState(() => loadFromStorage('lang_app_words', initialWords));
  const [quizHistory, setQuizHistory] = useState(() => loadFromStorage('lang_app_quiz', []));

  useEffect(() => {
    localStorage.setItem('lang_app_words', JSON.stringify(words));
  }, [words]);

  useEffect(() => {
    localStorage.setItem('lang_app_quiz', JSON.stringify(quizHistory));
  }, [quizHistory]);

  const addWord = (newWord) => {
    const wordWithId = {
      ...newWord,
      id: Date.now().toString(),
      learned: false
    };
    setWords(prev => [wordWithId, ...prev]);
  };

  const updateWord = (id, updatedFields) => {
    setWords(prev =>
      prev.map(word => (word.id === id ? { ...word, ...updatedFields } : word))
    );
  };

  const deleteWord = (id) => {
    setWords(prev => prev.filter(word => word.id !== id));
  };

  const toggleLearned = (id) => {
    setWords(prev =>
      prev.map(word => (word.id === id ? { ...word, learned: !word.learned } : word))
    );
  };

  const saveQuizResult = (score, total) => {
    const newEntry = {
      id: Date.now(),
      score,
      total,
      date: new Date().toLocaleDateString('uk-UA')
    };
    setQuizHistory(prev => [newEntry, ...prev]);
  };

  const resetProgress = () => {
    setWords(initialWords);
    setQuizHistory([]);
  };

  return (
    <WordsContext.Provider
      value={{
        words,
        quizHistory,
        addWord,
        updateWord,
        deleteWord,
        toggleLearned,
        saveQuizResult,
        resetProgress
      }}
    >
      {children}
    </WordsContext.Provider>
  );
}

export const useWords = () => useContext(WordsContext);