import React, { useState } from 'react';
import {useContext} from 'react'
import { NavContext } from "../navbar/router";
function JeuxA() {
  
  const {setShowNav} = useContext(NavContext);
  setShowNav(true)

  const [sentence, setSentence] = useState("");
  const [scrambledWords, setScrambledWords] = useState([]);
  const [userOrder, setUserOrder] = useState([]);
  const [isShuffled, setIsShuffled] = useState(false);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleInputChange = (event) => {
    setSentence(event.target.value);
  };

  const handleSubmit = () => {
    const words = sentence.split(" ");
    setScrambledWords(shuffleArray(words));
    setUserOrder([]);
    setIsShuffled(true);
  };

  const handleWordClick = (index) => {
    setUserOrder([...userOrder, scrambledWords[index]]);
    setScrambledWords(scrambledWords.filter((_, i) => i !== index));
  };

  const isCorrectOrder = () => {
    return sentence === userOrder.join(" ");
  };

  const handleRetry = () => {
    const words = sentence.split(" ");
    setScrambledWords(shuffleArray(words));
    setUserOrder([]);
  };

  const handleReset = () => {
    setSentence("");
    setScrambledWords([]);
    setUserOrder([]);
    setIsShuffled(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Comic Sans MS, sans-serif', backgroundColor: '#FFFACD' }}>
      <h1 style={{ color: '#FFD700' }}>Jeu de Réordonnancement de Phrase</h1>

      {!isShuffled && (
        <div>
          <input
            type="text"
            value={sentence}
            onChange={handleInputChange}
            placeholder="Entrez une phrase"
            style={{
              padding: '10px',
              width: '300px',
              marginRight: '10px',
              borderRadius: '10px',
              border: '2px solid #FFD700',
              backgroundColor: '#FFF8DC',
              color: '#333',
            }}
          />
          <button onClick={handleSubmit} style={{ padding: '10px', backgroundColor: '#FFD700', borderRadius: '10px', border: 'none', cursor: 'pointer' }}>
            Mélanger
          </button>
        </div>
      )}

      {isShuffled && (
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ color: '#FFD700' }}>Mots mélangés :</h3>
          <div>
            {scrambledWords.map((word, index) => (
              <span
                key={index}
                onClick={() => handleWordClick(index)}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  border: '2px solid #FFD700',
                  marginRight: '5px',
                  cursor: 'pointer',
                  backgroundColor: '#FFF8DC',
                  color: '#333',
                  display: 'inline-block',
                }}
              >
                {word}
              </span>
            ))}
          </div>

          <div style={{ marginTop: '20px' }}>
            <h3 style={{ color: '#FFD700' }}>Votre ordre :</h3>
            <p>{userOrder.join(" ")}</p>
          </div>

          {scrambledWords.length === 0 && (
            <div style={{ marginTop: '20px' }}>
              {isCorrectOrder() ? (
                <p style={{ color: 'green' }}>Bravo ! Vous avez réordonné correctement la phrase.</p>
              ) : (
                <p style={{ color: 'red' }}>Ce n'est pas le bon ordre. Réessayez !</p>
              )}
            </div>
          )}

          <div style={{ marginTop: '20px' }}>
            <button onClick={handleRetry} style={{ padding: '10px', marginRight: '10px', backgroundColor: '#FFD700', borderRadius: '10px', border: 'none', cursor: 'pointer' }}>
              Refaire
            </button>
            <button onClick={handleReset} style={{ padding: '10px', backgroundColor: 'red', borderRadius: '10px', border: 'none', cursor: 'pointer' }}>
              Supprimer tout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default JeuxA;
