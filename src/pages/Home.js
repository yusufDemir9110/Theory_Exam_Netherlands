import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../firebase/firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

const Home = () => {
  const [slides, setSlides] = useState([]);
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "Carslider-data"), (snapshot) =>
      setSlides(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    onSnapshot(collection(db, "topics-data"), (snapshot) =>
      setTopics(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  return (
    <div>
      <Navbar />
      <Carousel
        duration={5000}
        interval={10000}
        indicators={false}
        stopAutoPlayOnHover={false}
      >
        {slides.map(({ id, data }) => (
          <Paper
            key={id}
            className="paper"
            style={{ backgroundImage: "url(" + data.image + ")" }}
          >
            <h2 className="sliderHighLight">{data.highLight}</h2>
            <h4 className="sliderDescription">{data.description}</h4>
          </Paper>
        ))}
      </Carousel>
      <main>
        <h3>
          Prepare for the Netherlands driving test with our free lessons and
          practice exams
        </h3>
        <p>
          &gt;&gt;In Netherlands, to get a B driver's license, you must pass the
          theory exam and the driving test.
        </p>
        <p>
          &gt;&gt;There are 2 organizations responsible for obtaining driver's
          licenses and conducting driver's license exams:
        </p>
        <ul>
          <li>
            - Road Transport Authority-RDW (Rijksdienst voor het Wegverkeer):
            The RDW institution carries out the license work and transactions
            and also carries out inspections.
          </li>
          <li>
            - Centraal Bureau Rijvaardigheid (Centraal Bureau Rijvaardigheid):
            The CBR is the agency responsible for conducting driver examinations
            for all motor vehicles in the Netherlands, including cars, mopeds,
            motorcycles and trucks.
          </li>
        </ul>
        <p>
          &gt;&gt;Funny Driving License will be an excellent assistant for you
          about the B driver's license theory exam. We also strongly recommend
          you to apply for professional courses.
        </p>
      </main>
      <section>
        <h1 id="lessonH1">Lessons and Exercises</h1>
        <div className="topicCont">
          {topics.map(({ id, data }) => (
            <div
              key={id}
              className="topic"
              style={{ backgroundImage: "url(" + data.image + ")" }}
            >
              <div className="topic_name">{data.name}</div>
              <div className="topic_desc_bg">
                <div>
                  <div className="topic_desc" id="topic_desc_1">
                    &gt; {data.description1}
                  </div>
                  <div className="topic_desc" id="topic_desc_2">
                    &gt; {data.description2}
                  </div>
                  <div className="topic_desc" id="topic_desc_3">
                    &gt; {data.description3}
                  </div>
                  <div className="topic_desc" id="topic_desc_4">
                    &gt; {data.description4}
                  </div>
                </div>

                <div className="topic_desc" id="topic_desc_5">
                  <Link to={"/lessons"} state={{ state: data.name }}>
                    <button className="buttonTop">Lesson</button>
                  </Link>
                  <Link to={"/exercise"} state={{ state: data.name }}>
                    <button className="buttonTop">Exercise</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
