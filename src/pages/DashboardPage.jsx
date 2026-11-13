import { Link } from 'react-router-dom';
import { useWords } from '../context/WordsContext';
import StatCard from '../components/ui/StatCard';

export default function DashboardPage() {
  const { words, quizHistory, resetProgress } = useWords();

  const totalWords = words.length;
  const learnedWords = words.filter(w => w.learned).length;
  const progressPercent = totalWords > 0 ? Math.round((learnedWords / totalWords) * 100) : 0;

  const avgQuizScore = quizHistory.length > 0
    ? Math.round(
        quizHistory.reduce((acc, q) => acc + (q.score / q.total) * 100, 0) / quizHistory.length
      )
    : 0;

  return (
    <div className="page">
      <div className="dashboard-hero">
        <div>
          <h1>Ваш прогрес вивчення</h1>
          <p>Вивчайте нові слова за допомогою карток, перевіряйте знання у тестах та поповнюйте словник через API.</p>
        </div>
        <div className="hero-actions">
          <Link to="/flashcards" className="btn-primary">Тренувати картки</Link>
          <Link to="/quiz" className="btn-secondary">Пройти тест</Link>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Усього слів у словнику"
          value={totalWords}
          subtitle="Доступно для тренування"
        />
        <StatCard
          title="Вивчено слів"
          value={`${learnedWords} / ${totalWords}`}
          subtitle={`Прогрес: ${progressPercent}%`}
          highlight
        />
        <StatCard
          title="Пройдено тестів"
          value={quizHistory.length}
          subtitle={`Середня успішність: ${avgQuizScore}%`}
        />
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <span>Загальний прогрес курсу</span>
          <strong>{progressPercent}%</strong>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="recent-section">
        <div className="section-header">
          <h3>Історія останніх тестів</h3>
          <button onClick={resetProgress} className="btn-danger btn-sm">
            Скинути демо-дані
          </button>
        </div>

        {quizHistory.length === 0 ? (
          <p className="empty-text">Ви ще не проходили жодного тесту. Саме час спробувати!</p>
        ) : (
          <ul className="history-list">
            {quizHistory.slice(0, 5).map(item => (
              <li key={item.id} className="history-item">
                <span>Дата: {item.date}</span>
                <strong>Результат: {item.score} з {item.total} правильних</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}