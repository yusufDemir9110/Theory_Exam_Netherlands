import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { GlobalContext } from "../context/GlobalState";
import useOnSnapshot from "../hooks/useOnSnapshot";

const Home = () => {
  const { language } = useContext(GlobalContext);
  const [slides] = useOnSnapshot("slider-data-", language);
  const [topics] = useOnSnapshot("topics-data-", language);

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
            ??cretsiz derslerimiz ve uygulama s??navlar??m??zla Hollanda ehliyet
            s??nav??na haz??rlan??n
          </h3>
          <p>
            &gt;&gt;Hollanda'da B ehliyeti almak i??in teori s??nav??n?? ve
            direksiyon s??nav??n?? ge??melisiniz.
          </p>
          <p>
            &gt;&gt;S??r??c?? belgelerinin al??nmas??ndan ve s??r??c?? belgesi
            s??navlar??n??n y??r??t??lmesinden sorumlu 2 kurulu?? vard??r:
          </p>
          <ul>
            <li>
              Karayollar?? Ula????m Otoritesi-RDW (Rijksdienst voor het
              Wegverkeer): RDW kurumu, ruhsat i?? ve i??lemlerini y??r??tmekte ve
              ayr??ca denetimler yapmaktad??r.
            </li>
            <li>
              S??r???? Becerileri Merkezi B??rosu (Centraal Bureau Rijvaardigheid):
              CBR, Hollanda'da arabalar, mopedler, motosikletler ve kamyonlar
              dahil olmak ??zere t??m motorlu ta????tlar i??in s??r??c?? muayeneleri
              yapmaktan sorumlu kurumdur.
            </li>
          </ul>
          <p>
            &gt;&gt;Theory Exam Netherlands, B ehliyet teori s??nav?? hakk??nda
            size m??kemmel bir yard??mc?? olacakt??r. Ayr??ca profesyonel kurslara
            ba??vurman??z?? ??iddetle tavsiye ederiz.
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
