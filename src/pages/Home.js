import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { GlobalContext } from "../context/GlobalState";
import useOnSnapshot from "../hooks/useOnSnapshot";
import homeImg from "../assets/homeImg.jpg";

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
      <main className="homeMain">
        {language === "English" ? (
          <article>
            <h3>Do you want to drive a car?</h3>
            <p>
              Go to the nearest supermarket to you. You can buy your driver's
              license there for 1 euro.
            </p>
            <p>
              How easy would it be if you could get your driver's license this
              way, wouldn't it? But life is not that easy. As in many countries
              of the world, you must pass the theory exam and the driving exam
              to obtain a class B driver's license in the Netherlands.
            </p>
            <p>
              Only Tom Cruise's Mission Impossible crew can pass these exams...
              Do not worry. Life isn't easy, but it's not that hard either. All
              you have to do to pass these exams is study and practice.
            </p>
            <p>
              Fortunately, you have very good helpers in this regard. Theory
              Exam Netherlands, will be an excellent assistant for you about the
              B driver's license theory exam. But don't just settle for us. We
              also strongly recommend you to apply for professional courses.
            </p>
          </article>
        ) : (
          <article>
            <h3>Otomobil kullanmak mı istiyorsunuz?</h3>
            <p>
              Size en yakın süpermarkete gidin. Ehliyetinizi oradan 1 euro
              karşılığında satın alabilirsiniz.
            </p>
            <p>
              Sürücü belgesini bu şekilde alabilseniz ne kadar kolay olurdu,
              değil mi? Ama hayat bu kadar kolay değil. Dünyanın birçok
              ülkesinde olduğu gibi Hollanda'da da B sınıfı sürücü belgesi almak
              için teori sınavını ve direksiyon sınavını geçmelisiniz.
            </p>
            <p>
              Bu sınavları sadece Tom Cruise'un Görevimiz Tehlike ekibi
              geçebilir... Merak etmeyin. Hayat kolay değil ama o kadar da zor
              değil. Bu sınavları geçmek için yapmanız gereken tek şey çalışmak
              ve pratik yapmaktır.
            </p>
            <p>
              Neyse ki bu konuda çok iyi yardımcılarınız var. Teori Sınavı
              Hollanda, B ehliyet teori sınavı hakkında size mükemmel bir
              yardımcı olacaktır. Ama bizimle yetinmeyin. Ayrıca profesyonel
              kurslara başvurmanızı şiddetle tavsiye ederiz.
            </p>
          </article>
        )}
        <article>
          <div className="homeImgContainer">
            <img className="homeImg" src={homeImg} alt="Happy Driver" />
          </div>
        </article>
      </main>

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
