import React, { useState, useContext } from "react";

import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import Footer from "../components/Footer";
import { GlobalContext } from "../context/GlobalState";
import useOnSnapshot from "../hooks/useOnSnapshot";

const ExercisesResult = () => {
  const { state } = useLocation();
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [analysis, setAnalysis] = useState(false);
  const { language } = useContext(GlobalContext);
  const [results] = useOnSnapshot(
    "exercises-data-",
    language,
    `-${state.newTopicName}`
  );
  const calculateScore = () => {
    let newScore = 0;
    for (let i = 0; i < results.length; i++) {
      if (state.userAnswers[i] === results[i].data.rightOption) {
        newScore = newScore + 1;
      }
    }
    setScore(newScore);
    setShowScore(true);
  };
  const showAnalysis = () => {
    setAnalysis(true);
  };
  return (
    <div>
      <Navbar />
      <div className="main">
        <div className="scoreContainer">
          <button className="calculate" onClick={calculateScore}>
            {language === "English" ? "Calculate Score" : "Skoru Hesapla"}
          </button>
          {showScore ? (
            <div className="score">
              {score} / {results.length}
            </div>
          ) : null}
        </div>

        <div className="scoreContainer">
          <button className="calculate" onClick={showAnalysis}>
            {language === "English" ? "Analysis" : "Analiz"}
          </button>
        </div>
        {analysis === true ? (
          <div>
            <div>
              {results.map(({ id, data }, index) => {
                return (
                  <div className="queContainer" key={id}>
                    <div className="queImage">
                      <img src={data.image} alt={data.imageAlt}></img>
                    </div>
                    <div className="que">{data.question}</div>
                    <div>
                      <div>
                        <div>
                          <span className="answerHead">
                            {language === "English"
                              ? "Your Answer"
                              : "Sizin Cevabınız"}
                          </span>
                          <div className="answer">
                            {state.userAnswers[index] ===
                            results[index].data.rightOption ? (
                              <div className="templateCorrect"></div>
                            ) : (
                              <div className="templateWrong"></div>
                            )}
                            <p>{state.userAnswers[index]}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          <span className="answerHead">
                            {language === "English"
                              ? "Correct Answer"
                              : "Doğru Cevap"}
                          </span>
                          <div className="answer">
                            <p>{data.rightOption}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
        <div className="scoreContainer">
          <Link to="/">
            <button className="calculate">
              {language === "English" ? "Go to Homepage" : "Anasayfaya Dön"}
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExercisesResult;
