export default function WordCard({ word, onToggleLearned, onEdit, onDelete }) {
  const playAudio = () => {
    if (word.audio) {
      new Audio(word.audio).play();
    } else {
      const utterance = new SpeechSynthesisUtterance(word.english);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`word-card ${word.learned ? 'word-learned' : ''}`}>
      <div className="word-card-header">
        <div>
          <span className="badge">{word.category}</span>
          <h3 className="word-title">
            {word.english}
            <button onClick={playAudio} className="btn-audio" title="Прослухати вимову">
              🔊
            </button>
          </h3>
          {word.transcription && <span className="word-transcription">{word.transcription}</span>}
        </div>
        <button
          onClick={() => onToggleLearned(word.id)}
          className={`btn-status ${word.learned ? 'status-done' : ''}`}
        >
          {word.learned ? '✓ Вивчено' : 'На вивченні'}
        </button>
      </div>

      <p className="word-translation">{word.ukrainian}</p>
      {word.example && <p className="word-example">"{word.example}"</p>}

      <div className="word-actions">
        <button onClick={() => onEdit(word)} className="btn-secondary btn-sm">
          Редагувати
        </button>
        <button onClick={() => onDelete(word.id)} className="btn-danger btn-sm">
          Видалити
        </button>
      </div>
    </div>
  );
}