import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import useOnSnapshot from "../hooks/useOnSnapshot";
import { Modal, Button } from "react-bootstrap";

const Lessons = () => {
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(false);
  const [prevButtonVisible, setPrevButtonVisible] = useState(false);
  const location = useLocation();
  const { language } = useContext(GlobalContext);
  const [lessons] = useOnSnapshot(
    "lessons-data-",
    language,
    `-${location.state}`
  );
  const length = lessons.length;
  const navigate = useNavigate();
  const newTopicName = location.state;

  const nextSlide = () => {
    if (current < length) {
      setCurrent(current + 1);
    }
    if (current === 0) {
      setPrevButtonVisible(true);
    }
  };
  const prevSlide = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
    if (current === 1) {
      setPrevButtonVisible(false);
    }
  };

  const handleClose = () => setShow(false);

  const goFinalPage = () => {
    navigate("/exercises", { state: { newTopicName } });
  };

  return (
    <div>
      <div className="slideBody">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {language === "English"
                ? "Lessons are finished! If you want, you can repeat the slides or skip to the exercise part..."
                : "Dersler bitti! Dilerseniz slaytları tekrarlayabilir veya test kısmına geçebilirsiniz..."}
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer style={{ paddingBottom: 40 }}>
            <Button variant="secondary" onClick={handleClose}>
              {language === "English" ? "Return to Slides" : "Slaytlara Dön"}
            </Button>
            <Button variant="primary" onClick={goFinalPage}>
              {language === "English" ? "Go to Exercises" : "Teste Geç"}
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="mainSlide">
          {lessons.map(({ id, data }, index) => (
            <div
              className={index === current ? "data active" : "data"}
              key={id}
            >
              {index === current && (
                <div className="slide">
                  <div className="dataHeadLesson">{data.head}</div>
                  <div className="dataImageLesson">
                    <img src={data.image} alt={data.imageAlt}></img>
                  </div>
                  <div
                    className="dataDesc"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                  ></div>
                  <div className="buttonCont">
                    <button
                      style={
                        prevButtonVisible
                          ? { display: "block" }
                          : { display: "none" }
                      }
                      onClick={prevSlide}
                    >
                      {language === "English" ? "Prev" : "Önceki"}
                    </button>
                    <button
                      onClick={() =>
                        current === length - 1 ? setShow(true) : nextSlide()
                      }
                    >
                      {language === "English" && current === length - 1
                        ? "Finish"
                        : language === "English" && current !== length - 1
                        ? "Next"
                        : language === "Turkish" && current === length - 1
                        ? "Bitir"
                        : "Sonraki"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lessons;
