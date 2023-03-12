import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../firebase/firebase";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const Navbar = () => {
  const [topics, setTopics] = useState([]);
  const { changeLanguage, language } = useContext(GlobalContext);

  useEffect(() => {
    onSnapshot(collection(db, `topics-data-${language}`), (snapshot) =>
      setTopics(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, [changeLanguage, language]);

  return (
    <nav>
      <Link className="logoLink" to="/">
        <div className="logo">
          <div>TheoryExamNL</div>
        </div>
      </Link>
      <div className="menuMainItems">
        <ul className="mainUl">
          <li className="menuSubItems">
            {language === "English" ? "Lessons" : "Dersler"}
            <ul className="subUl">
              {topics.map(({ id, data }) => (
                <Link to={"/lessons"} key={id} state={data.name}>
                  <li>{data.name}</li>
                </Link>
              ))}
            </ul>
          </li>
          <li className="menuSubItems">
            {language === "English" ? "Exercises" : "Testler"}
            <ul className="subUl">
              {topics.map(({ id, data }) => (
                <Link to={"/exercises"} key={id} state={data.name}>
                  <li>{data.name}</li>
                </Link>
              ))}
            </ul>
          </li>
          <li className="menuSubItems">
            {language === "English" ? "Language" : "Dil"}
            <ul className="subUl">
              <li onClick={() => changeLanguage("English")}>
                {language === "English" ? "English" : "İngilizce"}
              </li>
              <li onClick={() => changeLanguage("Turkish")}>
                {language === "English" ? "Turkish" : "Türkçe"}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
