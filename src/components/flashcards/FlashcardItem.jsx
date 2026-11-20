import { useState, useEffect } from 'react';

export default function FlashcardItem({ word }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [word]);

  const playAudio = (e) => {
    e.stopPropagation(); 

    if (word.audio) {
      new Audio(word.audio).play();
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word.english);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flashcard-wrapper" onClick={() => setFlipped(!flipped)}>
      <div className={`flashcard ${flipped ? 'is-flipped' : ''}`}>
        {!flipped ? (
          <div className="flashcard-face flashcard-front">
            <span className="badge">{word.category}</span>
            <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {word.english}
              <button onClick={playAudio} className="btn-audio" title="Прослухати вимову">
                🔊
              </button>
            </h2>
            {word.transcription && <p className="transcription">{word.transcription}</p>}
            <span className="flip-hint">Натисніть на картку, щоб побачити переклад ↻</span>
          </div>
        ) : (
          <div className="flashcard-face flashcard-back">
            <span className="badge">Переклад</span>
            <h2>{word.ukrainian}</h2>
            {word.example && <p className="example">"{word.example}"</p>}
            <span className="flip-hint">Натисніть, щоб повернути ↻</span>
          </div>
        )}
      </div>
    </div>
  );
}