import React, { useState } from 'react';


function JeuxA(){
    const [sentence, setSentence] = useState("");
    const [scrambledWords, setScrambledWords] = useState([]);
    const [userOrder, setUserOrder] = useState([]);
    const [isShuffled, setIsShuffled] = useState(false);
  
    // Mélanger un tableau de mots
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
  
    // Gérer l'entrée de la phrase
    const handleInputChange = (event) => {
      setSentence(event.target.value);
    };
  
    // Soumettre la phrase et mélanger les mots
    const handleSubmit = () => {
      const words = sentence.split(" ");
      setScrambledWords(shuffleArray(words));
      setUserOrder([]);
      setIsShuffled(true);
    };
  
    // Gérer le clic sur un mot pour le réordonner
    const handleWordClick = (index) => {
      setUserOrder([...userOrder, scrambledWords[index]]);
      setScrambledWords(scrambledWords.filter((_, i) => i !== index));
    };
  
    // Vérifier si l'utilisateur a bien réordonné la phrase
    const isCorrectOrder = () => {
      return sentence === userOrder.join(" ");
    };
  
    // Refaire le jeu en réinitialisant l'état
    const handleRetry = () => {
      const words = sentence.split(" ");
      setScrambledWords(shuffleArray(words));
      setUserOrder([]);
    };
  
    // Supprimer tout et réinitialiser le jeu
    const handleReset = () => {
      setSentence("");
      setScrambledWords([]);
      setUserOrder([]);
      setIsShuffled(false);
    };
  
    return (
      <div style={{ padding: '20px' }}>
        <h1>Jeu de Réordonnancement de Phrase</h1>
  
        {!isShuffled && (
          <div>
            <input
              type="text"
              value={sentence}
              onChange={handleInputChange}
              placeholder="Entrez une phrase"
              style={{ padding: '10px', width: '300px', marginRight: '10px' }}
            />
            <button onClick={handleSubmit} style={{ padding: '10px' }}>
              Mélanger
            </button>
          </div>
        )}
  
        {isShuffled && (
          <div style={{ marginTop: '20px' }}>
            <h3>Mots mélangés :</h3>
            <div>
              {scrambledWords.map((word, index) => (
                <span
                  key={index}
                  onClick={() => handleWordClick(index)}
                  style={{
                    padding: '5px',
                    border: '1px solid black',
                    marginRight: '5px',
                    cursor: 'pointer',
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
  
            <div style={{ marginTop: '20px' }}>
              <h3>Votre ordre :</h3>
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
              <button onClick={handleRetry} style={{ padding: '10px', marginRight: '10px' }}>
                Refaire
              </button>
              <button onClick={handleReset} style={{ padding: '10px' }}>
                Supprimer tout
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  

export default JeuxA
