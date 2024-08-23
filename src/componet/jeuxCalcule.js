import React, { useState } from 'react';



import {useContext} from 'react'
import { NavContext } from "./navbar/router";
// Convertit un nombre en une chaîne d'images de pommes
const numberToApples = (num) => {
  const appleArray = [];
  for (let i = 0; i < num; i++) {
    appleArray.push(
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJIn5LuvueFItdiUGCfl55eh1O3fbfDHAaFA&s"
        alt="apple"
        key={i}
        style={{ width: '30px', height: '30px', margin: '2px' }}
      />
    );
  }
  return appleArray;
};

// Génère une question de calcul aléatoire avec uniquement des additions
const generateQuestion = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  
  const operator = '+';
  const answer = num1 + num2;
  
  return {
    question: (
      <>
        {numberToApples(num1)} {operator} {numberToApples(num2)}
      </>
    ),
    answer,
    options: generateOptions(answer)
  };
};

// Génère des options de réponse aléatoires
const generateOptions = (correctAnswer) => {
  const options = new Set();
  options.add(correctAnswer);
  
  while (options.size < 4) {
    const randomOption = Math.floor(Math.random() * 20) + 1;
    if (randomOption !== correctAnswer) {
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
  const {setShowNav} = useContext(NavContext);
  setShowNav(true)
  const handleAnswerClick = (answer) => {
    if (!gameOver) {
      if (answer === questionData.answer) {
        setScore(prevScore => prevScore + 1);
        setFeedback("Correct! Bravo!");
      } else {
        setFeedback("Incorrect! Essayez encore!");
      }
      
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 20) {
        setGameOver(true);
        setFeedback(`Game Over! Votre score est ${score} sur 20.`);
      } else {
        setQuestionData(generateQuestion());
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Aventuriers des Nombres</h1>
      
      {!gameOver && (
        <>
          <div style={styles.questionContainer}>
            <h3 style={styles.subHeader}>Question :</h3>
            <p>{questionData.question}</p>
          </div>
          
          <div style={styles.optionsContainer}>
            <h3 style={styles.subHeader}>Choisissez la réponse :</h3>
            {questionData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                style={styles.button}
              >
                {numberToApples(option)}
              </button>
            ))}
          </div>
          
          {feedback && <p style={styles.feedback}>{feedback}</p>}
        </>
      )}
      
      {gameOver && (
        <div style={styles.gameOverContainer}>
          <h3 style={styles.subHeader}>Votre score final :</h3>
          <p style={styles.score}>{score} sur 20</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    backgroundColor: '#fff5cc',
    borderRadius: '15px',
    textAlign: 'center',
    maxWidth: '500px',
    margin: '0 auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    color: '#ffa500',
    fontSize: '2em',
    marginBottom: '20px',
  },
  questionContainer: {
    marginBottom: '20px',
    backgroundColor: '#ffeb99',
    borderRadius: '10px',
    padding: '10px',
  },
  subHeader: {
    color: '#ff9900',
    marginBottom: '10px',
  },
  optionsContainer: {
    marginBottom: '20px',
  },
  button: {
    margin: '5px',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#ffd966',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#ffc000',
  },
  feedback: {
    fontSize: '1.2em',
    marginTop: '20px',
  },
  gameOverContainer: {
    marginTop: '20px',
  },
  score: {
    fontSize: '1.5em',
    color: '#ff6600',
  },
};

export default MathGame;
