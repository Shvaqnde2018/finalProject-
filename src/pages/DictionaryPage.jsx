import { useState } from 'react';
import { useWords } from '../context/WordsContext';
import WordForm from '../components/dictionary/WordForm';
import FilterBar from '../components/dictionary/FilterBar';
import WordCard from '../components/dictionary/WordCard';

export default function DictionaryPage() {
  const { words, addWord, updateWord, deleteWord, toggleLearned } = useWords();
  
  const [editingWord, setEditingWord] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');

  const handleSaveWord = (wordData) => {
    if (editingWord) {
      updateWord(editingWord.id, wordData);
      setEditingWord(null);
    } else {
      addWord(wordData);
    }
  };

  const filteredWords = words.filter(word => {
    const matchesSearch =
      word.english.toLowerCase().includes(search.toLowerCase()) ||
      word.ukrainian.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || word.category === category;
    const matchesStatus =
      status === 'all' ||
      (status === 'learned' && word.learned) ||
      (status === 'learning' && !word.learned);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="page">
      <h1>Мій словник</h1>

      <WordForm
        onSubmit={handleSaveWord}
        editingWord={editingWord}
        onCancelEdit={() => setEditingWord(null)}
        existingWords={words}
      />

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        status={status}
        onStatusChange={setStatus}
      />

      {filteredWords.length === 0 ? (
        <p className="empty-text">За вашим запитом слів не знайдено.</p>
      ) : (
        <div className="words-grid">
          {filteredWords.map(word => (
            <WordCard
              key={word.id}
              word={word}
              onToggleLearned={toggleLearned}
              onEdit={setEditingWord}
              onDelete={deleteWord}
            />
          ))}
        </div>
      )}
    </div>
  );
}