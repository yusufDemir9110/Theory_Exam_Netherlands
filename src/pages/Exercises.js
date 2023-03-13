import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalState";
import useOnSnapshot from "../hooks/useOnSnapshot";

const Exercises = () => {
  const [current, setCurrent] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [show, setShow] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();
  const { language } = useContext(GlobalContext);
  const [exercises] = useOnSnapshot(
    "exercises-data-",
    language,
    location.state.newTopicName
      ? `-${location.state.newTopicName}`
      : `-${location.state}`
  );
  const newTopicName = location.state.newTopicName
    ? location.state.newTopicName
    : location.state;
  console.log(location);
  const length = exercises.length;
  const handleClose = () => setShow(false);
  const nextSlide = (e) => {
    e.preventDefault();
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = (e) => {
    e.preventDefault();
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const handleClickAnswer = (e, index) => {
    userAnswers[index] = e.target.textContent;
    setUserAnswers([...userAnswers]);
  };
  const changeAnswer = (e, index) => {
    userAnswers[index] = "";
    setUserAnswers([...userAnswers]);
  };
  const finishExam = () => {
    setShow(true);
  };
  const goFinalPage = () => {
    navigate("/exercises-result", { state: { userAnswers, newTopicName } });
  };
  return (
    <div>
      <div className="slideBodyExercise">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {language === "English" ? "Are you sure?" : "Emin misiniz?"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer style={{ paddingBottom: 40 }}>
            <Button variant="secondary" onClick={handleClose}>
              {language === "English" ? "Cancel" : "İptal"}
            </Button>
            <Button variant="primary" onClick={goFinalPage}>
              {language === "English" ? "Finish the Exam" : "Sınavı Bitir"}
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="mainSlideExercise">
          {exercises.map(({ id, data }, index) => (
            <div
              className={index === current ? "data active" : "data"}
              key={id}
            >
              {index === current && (
                <div className="slideExercise">
                  <div className="dataImage">
                    <img src={data.image} alt={data.imageAlt}></img>
                  </div>
                  <div className="dataQue">
                    <span className="queIndex">
                      {language === "English" ? "Question" : "Soru"} {index + 1}
                    </span>
                    <div className="queText">
                      &nbsp;&nbsp;&nbsp;{data.question}
                    </div>
                  </div>
                  <div>
                    {userAnswers[index] ? (
                      <div className="selectedContainer">
                        <div className="selected">{userAnswers[index]}</div>
                        <div className="changeAnswerContainer">
                          <button
                            className="changeAnswer"
                            onClick={(e) => changeAnswer(e, index)}
                          >
                            {language === "English"
                              ? "Change Answer"
                              : "Cevabı Değiştir"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      (data.rightOption + "," + data.wrongOptions)
                        .split(",")
                        .sort(() => 0.5 - Math.random())
                        .map((option) => (
                          <div
                            key={id}
                            className="options"
                            id={option}
                            onClick={(e) => handleClickAnswer(e, index)}
                          >
                            {option}
                          </div>
                        ))
                    )}
                  </div>
                  <div className="buttonCont">
                    <button onClick={prevSlide}>
                      {language === "English" ? "Prev" : "Önceki"}
                    </button>
                    <button onClick={nextSlide}>
                      {language === "English" ? "Next" : "Sonraki"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="finishExamContainer">
          <button className="finishExam" onClick={finishExam}>
            {language === "English" ? "Finish Exam" : "Sınavı Bitir"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Exercises;
