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
      <div class="logo">
        <div>TheoryExam</div>
      </div>
      <div class="menuMainItems">
        <ul class="mainUl">
          <li class="menuSubItems">
            Lessons
            <ul class="subUl">
              {topics.map(({ id, data }) => (
                <Link to={"/lessons"} state={{ state: data.name }}>
                  <li key={id}>{data.name}</li>
                </Link>
              ))}
            </ul>
          </li>
          <li class="menuSubItems">
            Exercises
            <ul class="subUl">
              {topics.map(({ id, data }) => (
                <Link to={"/exercises"} state={{ state: data.name }}>
                  <li key={id}>{data.name}</li>
                </Link>
              ))}
            </ul>
          </li>
          <li class="menuSubItems">
            Languages
            <ul class="subUl">
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
