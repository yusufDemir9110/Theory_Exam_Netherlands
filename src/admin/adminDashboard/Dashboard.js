import React, { useState } from "react";
import AdminLessons from "./dashboardComponents/AdminLessons";
import AdminTopics from "./dashboardComponents/AdminTopics";
import AdminExercises from "./dashboardComponents/AdminExercises";
import AdminSlider from "./dashboardComponents/AdminSlider";

const Dashboard = () => {
  const [language, setLanguage] = useState("English");

  function chooseLangTopic(e) {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
  }

  return (
    <div>
      <div className="selectLanguage">
        <select
          id="languages"
          size="3"
          onChange={(e) => chooseLangTopic(e)}
          value={language}
        >
          <option id="English" value="English">
            English
          </option>
          <option id="Turkish" value="Turkish">
            Turkish
          </option>
        </select>
        <h3>
          Chosen language is <strong> {language}</strong>
        </h3>
      </div>

      <AdminTopics language={language} />
      <AdminLessons language={language} />
      <AdminExercises language={language} />
      <AdminSlider language={language} />
    </div>
  );
};

export default Dashboard;
