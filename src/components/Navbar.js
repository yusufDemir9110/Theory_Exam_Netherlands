import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../firebase/firebase";

const Navbar = () => {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
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
    <nav>
      <div className="logo">
        <div>TheoryExam</div>
      </div>
      <div className="menuMainItems">
        <ul className="mainUl">
          <li className="menuSubItems">
            Lessons
            <ul className="subUl">
              {topics.map(({ id, data }) => (
                <Link to={"/lessons"} key={id} state={{ state: data.name }}>
                  <li>{data.name}</li>
                </Link>
              ))}
            </ul>
          </li>
          <li className="menuSubItems">
            Exercises
            <ul className="subUl">
              {topics.map(({ id, data }) => (
                <Link to={"/exercises"} key={id} state={{ state: data.name }}>
                  <li>{data.name}</li>
                </Link>
              ))}
            </ul>
          </li>
          <li className="menuSubItems">
            Languages
            <ul className="subUl">
              <Link to="/">
                <li>English</li>
              </Link>
              <Link to="/tr">
                <li>Turkish</li>
              </Link>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
