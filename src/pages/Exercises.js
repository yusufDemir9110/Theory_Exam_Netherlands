import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import db from "../firebase/firebase";
import { Modal, Button } from "react-bootstrap";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [current, setCurrent] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const length = exercises.length;
  const location = useLocation();
  const newTopicName = location.state;
  const navigate = useNavigate();

  const nextSlide = (e) => {
    e.preventDefault();
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = (e) => {
    e.preventDefault();
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    onSnapshot(collection(db, `exercises-data-${location.state}`), (snapshot) =>
      setExercises(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);
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
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Footer style={{ paddingBottom: 40 }}>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={goFinalPage}>
              Finish Exam
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
                    <span className="queIndex">Question {index + 1}</span>
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
                            Change Answer
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
                    <button onClick={prevSlide}>Prev</button>
                    <button onClick={nextSlide}>Next</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="finishExamContainer">
          <button className="finishExam" onClick={finishExam}>
            Finish Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default Exercises;
