import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WordsProvider } from './context/WordsContext';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import DictionaryPage from './pages/DictionaryPage';
import FlashcardsPage from './pages/FlashcardsPage';
import QuizPage from './pages/QuizPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <WordsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="dictionary" element={<DictionaryPage />} />
            <Route path="flashcards" element={<FlashcardsPage />} />
            <Route path="quiz" element={<QuizPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WordsProvider>
  );
}