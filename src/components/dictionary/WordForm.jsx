import { useState, useEffect } from 'react';
import { fetchWordData } from '../../services/dictionaryApi';

const initialFormState = {
  english: '',
  ukrainian: '',
  transcription: '',
  example: '',
  category: 'IT',
  audio: ''
};

export default function WordForm({ onSubmit, editingWord, onCancelEdit, existingWords }) {
  const [form, setForm] = useState(initialFormState);
  const [error, setError] = useState('');
  const [apiLoading, setApiLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState('');

  useEffect(() => {
    if (editingWord) {
      setForm(editingWord);
      setError('');
    } else {
      setForm(initialFormState);
    }
  }, [editingWord]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleFetchFromApi = async () => {
    if (!form.english.trim()) {
      setError('Спочатку введіть англійське слово для пошуку в API');
      return;
    }
    setApiLoading(true);
    setError('');
    setApiMessage('');

    try {
      const apiData = await fetchWordData(form.english);
      setForm(prev => ({
        ...prev,
        transcription: apiData.transcription || prev.transcription,
        example: apiData.example || prev.example,
        audio: apiData.audio || prev.audio
      }));
      setApiMessage('Дані (транскрипція та приклад) успішно підтягнуті з API!');
    } catch (err) {
      setError(err.message);
    } finally {
      setApiLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const engTrimmed = form.english.trim();
    const ukrTrimmed = form.ukrainian.trim();

    if (!engTrimmed || !ukrTrimmed) {
      setError('Поля "Англійське слово" та "Переклад" є обов’язковими!');
      return;
    }

    if (!/^[a-zA-Z\s-]+$/.test(engTrimmed)) {
      setError('Англійське слово має містити лише латинські літери!');
      return;
    }

    const isDuplicate = existingWords.some(
      w => w.english.toLowerCase() === engTrimmed.toLowerCase() && w.id !== editingWord?.id
    );

    if (isDuplicate) {
      setError('Це слово вже є у вашому словнику!');
      return;
    }

    onSubmit({
      ...form,
      english: engTrimmed,
      ukrainian: ukrTrimmed
    });

    setForm(initialFormState);
    setApiMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="word-form">
      <h3>{editingWord ? 'Редагувати слово' : 'Додати нове слово'}</h3>

      {error && <div className="alert alert-error">{error}</div>}
      {apiMessage && <div className="alert alert-success">{apiMessage}</div>}

      <div className="form-grid">
        <div className="form-group">
          <label>Англійське слово *</label>
          <div className="input-with-btn">
            <input
              type="text"
              name="english"
              value={form.english}
              onChange={handleChange}
              placeholder="Напр. developer"
              className="input-field"
            />
            <button
              type="button"
              onClick={handleFetchFromApi}
              disabled={apiLoading}
              className="btn-api"
            >
              {apiLoading ? 'Пошук...' : 'Заповнити з API'}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Переклад українською *</label>
          <input
            type="text"
            name="ukrainian"
            value={form.ukrainian}
            onChange={handleChange}
            placeholder="Напр. розробник"
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Транскрипція (з API або вручну)</label>
          <input
            type="text"
            name="transcription"
            value={form.transcription}
            onChange={handleChange}
            placeholder="/dɪˈvɛləpə/"
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Категорія</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="select-field"
          >
            <option value="IT">IT</option>
            <option value="Подорожі">Подорожі</option>
            <option value="Життя">Життя</option>
            <option value="Базові">Базові</option>
          </select>
        </div>
      </div>

      <div className="form-group" style={{ marginTop: '12px' }}>
        <label>Приклад вживання / визначення</label>
        <input
          type="text"
          name="example"
          value={form.example}
          onChange={handleChange}
          placeholder="Речення з цим словом..."
          className="input-field"
        />
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn-primary">
          {editingWord ? 'Зберегти зміни' : '+ Додати у словник'}
        </button>
        {editingWord && (
          <button type="button" onClick={onCancelEdit} className="btn-secondary">
            Скасувати
          </button>
        )}
      </div>
    </form>
  );
}