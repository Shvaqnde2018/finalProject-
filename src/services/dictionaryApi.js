export async function fetchWordData(word) {
  const cleanWord = word.trim().toLowerCase();
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`);
  
  if (!response.ok) {
    throw new Error('Слово не знайдено у глобальному словнику API');
  }

  const data = await response.json();
  const entry = data[0];

  const transcription = entry.phonetic || (entry.phonetics?.find(p => p.text)?.text) || '';
  const audio = entry.phonetics?.find(p => p.audio && p.audio.length > 0)?.audio || '';
  
  let example = '';
  let definition = '';

  if (entry.meanings && entry.meanings.length > 0) {
    for (const meaning of entry.meanings) {
      for (const def of meaning.definitions) {
        if (!definition && def.definition) definition = def.definition;
        if (!example && def.example) example = def.example;
      }
    }
  }

  return {
    transcription,
    audio,
    example: example || definition || ''
  };
}