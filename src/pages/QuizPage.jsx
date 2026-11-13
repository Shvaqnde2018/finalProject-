import { useState, useMemo } from 'react';
import { useWords } from '../context/WordsContext';

export default function QuizPage() {
  const { words, saveQuizResult } = useWords();
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [quizKey, setQuizKey] = useState(0);

  const questions = useMemo(() => {
    if (words.length < 4) return [];
    const shuffled = [...words].sort(() => Math.random() - 0.5);

    return shuffled.map(correctWord => {
      const wrongOptions = words
        .filter(w => w.id !== correctWord.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => w.ukrainian);

      const options = [...wrongOptions, correctWord.ukrainian].sort(() => Math.random() - 0.5);

      return {
        word: correctWord.english,
        correctAnswer: correctWord.ukrainian,
        options
      };
    });
  }, [words, quizKey]);

  if (words.length < 4) {
    return (
      <div className="page">
        <h1>Тестування</h1>
        <p className="empty-text">Для генерації тесту у словнику має бути щонайменше 4 слова.</p>
      </div>
    );
  }

  const currentQ = questions[currentStep];

  const handleOptionClick = (option) => {
    if (selectedOption) return;
    setSelectedOption(option);

    const isCorrect = option === currentQ.correctAnswer;
    const updatedScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(updatedScore);

    setTimeout(() => {
      if (currentStep + 1 < questions.length) {
        setCurrentStep(prev => prev + 1);
        setSelectedOption(null);
      } else {
        setIsFinished(true);
        saveQuizResult(updatedScore, questions.length);
      }
    }, 900);
  };

  const restartQuiz = () => {
    setCurrentStep(0);
    setScore(0);
    setSelectedOption(null);
    setIsFinished(false);
    setQuizKey(prev => prev + 1);
  };

  return (
    <div className="page quiz-page">
      <h1>Перевірка знань</h1>

      {isFinished ? (
        <div className="quiz-card quiz-result">
          <h2>Тест завершено! 🎉</h2>
          <p className="result-score">
            Ваш результат: <strong>{score}</strong> із <strong>{questions.length}</strong>
          </p>
          <button onClick={restartQuiz} className="btn-primary">
            Пройти ще раз
          </button>
        </div>
      ) : (
        <div className="quiz-card">
          <div className="quiz-header">
            <span>Питання {currentStep + 1} із {questions.length}</span>
            <span>Бали: {score}</span>
          </div>

          <h2 className="quiz-word">{currentQ.word}</h2>
          <p className="quiz-prompt">Оберіть правильний переклад:</p>

          <div className="quiz-options">
            {currentQ.options.map((option, idx) => {
              let btnClass = 'quiz-option-btn';
              if (selectedOption) {
                if (option === currentQ.correctAnswer) btnClass += ' correct';
                else if (option === selectedOption) btnClass += ' wrong';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  className={btnClass}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}