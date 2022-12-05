import React, { useState, useEffect, useContext } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import db from "../firebase/firebase";
import { GlobalContext } from "../context/GlobalState";

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [current, setCurrent] = useState(0);
  const length = lessons.length;
  const location = useLocation();
  const { language } = useContext(GlobalContext);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    onSnapshot(
      collection(db, `lessons-data-${language}-${location.state}`),
      (snapshot) =>
        setLessons(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
    );
  }, []);
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
                    <button onClick={prevSlide}>Prev</button>
                    <button onClick={nextSlide}>Next</button>
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
