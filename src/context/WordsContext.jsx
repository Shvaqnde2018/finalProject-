import { createContext, useContext, useState, useEffect } from 'react';
import { initialWords } from '../data/initialWords';

const WordsContext = createContext();

export function WordsProvider({ children }) {
  const [words, setWords] = useState(() => {
    const saved = localStorage.getItem('lang_app_words');
    return saved ? JSON.parse(saved) : initialWords;
  });

  const [quizHistory, setQuizHistory] = useState(() => {
    const saved = localStorage.getItem('lang_app_quiz');
    return saved ? JSON.parse(saved) : [];
  });

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