import { useEffect, useState } from 'react'

import './App.css'
import questionsData from "./question.json";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(0);
  const [timer, setTimer] = useState(15);

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === questionsData[currentQuestion].correctOption) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setTimer(15);
    } else {
      setShowScore(true);
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(15);
  }
  useEffect(() => {
    let interval;
    if (timer > 0 && !showScore) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setShowScore(true);
    }

    return () => clearInterval(interval);
  }, [timer, showScore]);
  return (
    <>
      <div className="quiz-app">
        {showScore ? (
          <div className="score-section"  >
            <h2>Your Score : {score}/{questionsData.length}</h2>
            <button onClick={handleRestartQuiz}>Restart</button>
            <button onClick={()=>alert("Thanks for Attending the Quiz.")}>Done</button>
          </div>
        ) : (<div className="question-section">
          <h2>Question : {currentQuestion + 1}</h2>
          <p>{questionsData[currentQuestion].question}</p>
          <div className="options">
            {questionsData[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() =>
                handleAnswerClick(option)
              }>{option}</button>
            ))}
          </div>
          <div className="timer">Time Left: <span>{timer}s</span></div>
        </div>)}

      </div>
    </>
  )
}

export default App;
