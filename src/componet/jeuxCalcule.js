import React, { useState } from 'react';

// Convertit un nombre en une chaîne d'images de pommes
const numberToApples = (num) => {
  const appleArray = [];
  for (let i = 0; i < num; i++) {
    appleArray.push(<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJIn5LuvueFItdiUGCfl55eh1O3fbfDHAaFA&s" alt="apple" key={i} style={{ width: '30px', height: '30px', margin: '2px' }} />);
  }
  return appleArray;
};

// Génère une question de calcul aléatoire avec uniquement des additions
const generateQuestion = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  
  // On utilise uniquement l'opérateur '+'
  const operator = '+';
  
  const answer = num1 + num2;
  
  return {
    question: `${num1} ${operator} ${num2}`,
    answer,
    options: generateOptions(answer)
  };
};

// Génère des options de réponse aléatoires
const generateOptions = (correctAnswer) => {
  const options = new Set();
  options.add(correctAnswer);
  
  while (options.size < 4) {
    const randomOption = Math.floor(Math.random() * 20) + 1; // Génère des nombres positifs uniquement
    if (randomOption !== correctAnswer) { // Éviter les doublons
      options.add(randomOption);
    }
  }
  
  return [...options].sort(() => Math.random() - 0.5);
};

function MathGame() {
  const [questionData, setQuestionData] = useState(generateQuestion());
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleAnswerClick = (answer) => {
    if (!gameOver) {
      if (answer === questionData.answer) {
        setScore(prevScore => prevScore + 1);
        setFeedback("Correct ! Bravo !");
      } else {
        setFeedback("Incorrect ! Essayez encore !");
      }
      
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 20) {
        setGameOver(true);
        setFeedback(`Game Over! Votre score est ${score} sur 20.`);
      } else {
        // Générer une nouvelle question après une réponse
        setQuestionData(generateQuestion());
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', color: '#333' }}>
      <h1>Aventuriers des Nombres</h1>
      
      {!gameOver && (
        <>
          <div style={{ marginBottom: '20px' }}>
            <h3>Question :</h3>
            <p>{questionData.question}</p>
          </div>
          
          <div>
            <h3>Choisissez la réponse :</h3>
            {questionData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                style={{ margin: '5px', padding: '10px', fontSize: '16px' }}
              >
                {numberToApples(option)}
              </button>
            ))}
          </div>
          
          {feedback && <p>{feedback}</p>}
        </>
      )}
      
      {gameOver && (
        <div>
          <h3>Votre score final :</h3>
          <p>{score} sur 20</p>
        </div>
      )}
    </div>
  );
}

export default MathGame;
