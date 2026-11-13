import { useState } from 'react';
import { useWords } from '../context/WordsContext';
import FlashcardItem from '../components/flashcards/FlashcardItem';

export default function FlashcardsPage() {
  const { words, toggleLearned } = useWords();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (words.length === 0) {
    return <p className="empty-text">Словник порожній. Додайте слова на сторінці "Словник".</p>;
  }

  const currentWord = words[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % words.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
  };

  const handleMarkAndNext = () => {
    if (!currentWord.learned) {
      toggleLearned(currentWord.id);
    }
    handleNext();
  };

  return (
    <div className="page flashcards-page">
      <h1>Картки для запам’ятовування</h1>
      <p className="counter-text">
        Картка {currentIndex + 1} із {words.length} ({currentWord.learned ? 'Вивчено ✓' : 'На вивченні'})
      </p>

      <FlashcardItem word={currentWord} />

      <div className="flashcard-controls">
        <button onClick={handlePrev} className="btn-secondary">← Попередня</button>
        <button onClick={handleMarkAndNext} className="btn-primary">
          Знаю це слово ✓
        </button>
        <button onClick={handleNext} className="btn-secondary">Наступна →</button>
      </div>
    </div>
  );
}