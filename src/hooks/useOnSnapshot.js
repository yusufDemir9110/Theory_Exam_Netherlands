import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import db from "../firebase/firebase";

const useOnSnapshot = (dataLocation, language, dataDefinition = "") => {
  const [data, setData] = useState([]);
  useEffect(() => {
    onSnapshot(
      collection(db, `${dataLocation}${language}${dataDefinition}`),
      (snapshot) =>
        setData(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
    );
  }, [language]);
  return [data];
};

export default useOnSnapshot;
