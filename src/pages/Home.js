import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../firebase/firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { GlobalContext } from "../context/GlobalState";

const Home = () => {
  const [slides, setSlides] = useState([]);
  const [topics, setTopics] = useState([]);
  const { language } = useContext(GlobalContext);
  useEffect(() => {
    onSnapshot(collection(db, `slider-data-${language}`), (snapshot) =>
      setSlides(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    onSnapshot(collection(db, `topics-data-${language}`), (snapshot) =>
      setTopics(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, [language]);

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
      {language === "English" ? (
        <main>
          <h3>
            Prepare for the Netherlands driving test with our free lessons and
            practice exams
          </h3>
          <p>
            &gt;&gt;In Netherlands, to get a B driver's license, you must pass
            the theory exam and the driving test.
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
              - Central Bureau of Driving Skills (Centraal Bureau
              Rijvaardigheid): The CBR is the agency responsible for conducting
              driver examinations for all motor vehicles in the Netherlands,
              including cars, mopeds, motorcycles and trucks.
            </li>
          </ul>
          <p>
            &gt;&gt;Theory Exam Netherlands, will be an excellent assistant for
            you about the B driver's license theory exam. We also strongly
            recommend you to apply for professional courses.
          </p>
        </main>
      ) : (
        <main>
          <h3>
            Ücretsiz derslerimiz ve uygulama sınavlarımızla Hollanda ehliyet
            sınavına hazırlanın
          </h3>
          <p>
            &gt;&gt;Hollanda'da B ehliyeti almak için teori sınavını ve
            direksiyon sınavını geçmelisiniz.
          </p>
          <p>
            &gt;&gt;Sürücü belgelerinin alınmasından ve sürücü belgesi
            sınavlarının yürütülmesinden sorumlu 2 kuruluş vardır:
          </p>
          <ul>
            <li>
              Karayolları Ulaşım Otoritesi-RDW (Rijksdienst voor het
              Wegverkeer): RDW kurumu, ruhsat iş ve işlemlerini yürütmekte ve
              ayrıca denetimler yapmaktadır.
            </li>
            <li>
              Sürüş Becerileri Merkezi Bürosu (Centraal Bureau Rijvaardigheid):
              CBR, Hollanda'da arabalar, mopedler, motosikletler ve kamyonlar
              dahil olmak üzere tüm motorlu taşıtlar için sürücü muayeneleri
              yapmaktan sorumlu kurumdur.
            </li>
          </ul>
          <p>
            &gt;&gt;Theory Exam Netherlands, B ehliyet teori sınavı hakkında
            size mükemmel bir yardımcı olacaktır. Ayrıca profesyonel kurslara
            başvurmanızı şiddetle tavsiye ederiz.
          </p>
        </main>
      )}

      <section>
        <h1 id="lessonH1">
          {language === "English"
            ? "Lessons and Exercises"
            : "Dersler ve Testler"}
        </h1>
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
                  <Link to={"/lessons"} state={data.name}>
                    <button className="buttonTop">
                      {language === "English" ? "Lesson" : "Ders"}
                    </button>
                  </Link>
                  <Link to={"/exercises"} state={data.name}>
                    <button className="buttonTop">
                      {language === "English" ? "Exercise" : "Test"}
                    </button>
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
