import React, { useState } from 'react';

// Convertit un nombre en une chaîne de barres verticales
const numberToBars = (num) => {
  return num > 0 ? '| '.repeat(num).trim() : ''; // Assure que num est positif
};

// Génère une question de calcul aléatoire
const generateQuestion = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operator = Math.random() > 0.5 ? '+' : '-';
  
  let answer;
  if (operator === '+') {
    answer = num1 + num2;
  } else {
    answer = num1 - num2;
  }
  
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
    const randomOption = Math.floor(Math.random() * 20) - 10;
    if (randomOption > 0 && randomOption !== correctAnswer) { // Éviter les doublons et zéro
      options.add(randomOption);
    }
  }
  
  return [...options].sort(() => Math.random() - 0.5);
};

function MathGame() {
  const [questionData, setQuestionData] = useState(generateQuestion());
  const [feedback, setFeedback] = useState("");

  const handleAnswerClick = (answer) => {
    if (answer === questionData.answer) {
      setFeedback("Correct ! Bravo !");
    } else {
      setFeedback("Incorrect ! Essayez encore !");
    }
    
    // Générer une nouvelle question après une réponse
    setQuestionData(generateQuestion());
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', color: '#333' }}>
      <h1>Aventuriers des Nombres</h1>
      
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
            {numberToBars(option)}
          </button>
        ))}
      </div>
      
      {feedback && <p>{feedback}</p>}
    </div>
  );
}

export default MathGame;
