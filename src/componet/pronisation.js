import React, { useState } from 'react';
import {useContext} from 'react'
import { NavContext } from "./navbar/router";
const pronunciations = {
  French: {
    a: 'ah',
    b: 'bay',
    c: 'say',
    d: 'day',
    e: 'uh',
    f: 'eff',
    g: 'zhay',
    h: 'ash',
    i: 'ee',
    j: 'zhee',
    k: 'kah',
    l: 'ell',
    m: 'em',
    n: 'en',
    o: 'oh',
    p: 'pay',
    q: 'koo',
    r: 'air',
    s: 'ess',
    t: 'tay',
    u: 'oo',
    v: 'vay',
    w: 'double vay',
    x: 'eeks',
    y: 'ee-grek',
    z: 'zed',
  },
  Arabic: {
    ا: 'alif',
    ب: 'baa',
    ت: 'taa',
    ث: 'thaa',
    ج: 'jeem',
    ح: 'haa',
    خ: 'khaa',
    د: 'daal',
    ذ: 'dhaal',
    ر: 'raa',
    ز: 'zaa',
    س: 'seen',
    ش: 'sheen',
    ص: 'saad',
    ض: 'daad',
    ط: 'taa',
    ظ: 'thaa',
    ع: 'ayn',
    غ: 'ghayn',
    ف: 'faa',
    ق: 'qaaf',
    ك: 'kaaf',
    ل: 'laam',
    م: 'meem',
    ن: 'noon',
    ه: 'haa',
    و: 'waaw',
    ي: 'yaa',
  },
};

function Pre() {
  const [language, setLanguage] = useState('French');
  const [letter, setLetter] = useState('');
  const [pronunciation, setPronunciation] = useState('');
  const [feedback, setFeedback] = useState('');
  const {setShowNav} = useContext(NavContext);
  setShowNav(true)
  const generateRandomLetter = () => {
    const letters = Object.keys(pronunciations[language]);
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    setLetter(randomLetter);
    setPronunciation(pronunciations[language][randomLetter]);
    setFeedback('');
    
    // Play the pronunciation audio
    const utterance = new SpeechSynthesisUtterance(pronunciations[language][randomLetter]);
    utterance.lang = language === 'French' ? 'fr-FR' : 'ar-SA';
    speechSynthesis.speak(utterance);
  };

  const checkPronunciation = () => {
    const userPronunciation = prompt('Enter the pronunciation:').toLowerCase();
    if (userPronunciation === pronunciation.toLowerCase()) {
      setFeedback('Correct!');
    } else {
      setFeedback(`Wrong. The correct pronunciation is '${pronunciation}'.`);
    }
  };

  return (
    <div className="pronunciation-game">
      <h1>Pronunciation Game</h1>
      <div>
        <label>
          Choose a language:
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="French">French</option>
            <option value="Arabic">Arabic</option>
          </select>
        </label>
      </div>
      <button onClick={generateRandomLetter}>Get Random Letter</button>
      {letter && (
        <div>
          <p><strong>Letter:</strong> {letter}</p>
          <button onClick={checkPronunciation}>Check Pronunciation</button>
          {feedback && <p>{feedback}</p>}
        </div>
      )}
    </div>
  );
}

export default Pre;
