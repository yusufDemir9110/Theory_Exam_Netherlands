import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import useOnSnapshot from "../hooks/useOnSnapshot";

const Lessons = () => {
  const [current, setCurrent] = useState(0);
  const location = useLocation();
  const { language } = useContext(GlobalContext);
  const [lessons] = useOnSnapshot(
    "lessons-data-",
    language,
    `-${location.state}`
  );
  const length = lessons.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div>
      <div className="slideBody">
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
      </div>
    </div>
  );
};

export default Lessons;
