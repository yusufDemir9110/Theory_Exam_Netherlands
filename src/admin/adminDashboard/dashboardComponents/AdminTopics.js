import React, { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import db, { storage } from "../../../firebase/firebase";

const AdminTopics = ({ language }) => {
  const [topic, setTopic] = useState({
    id: "",
    name: "",
    image: "",
    description1: "",
    description2: "",
    description3: "",
    description4: "",
  });
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");

  function handleChange(e) {
    topic[e.target.id] = e.target.value;
    setTopic({ ...topic, topic });
    if (
      topic.id !== "" &&
      topic.name !== "" &&
      imageUrl !== "" &&
      topic.description1 !== ""
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  const imageHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    const storageRef = ref(storage, `/topics/${language}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => setError(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) =>
          setImageUrl(url, imageUrl)
        );
      }
    );
  };

  const add = async (event) => {
    event.preventDefault();
    await setDoc(doc(db, `topics-data-${language}`, topic.id), {
      name: topic.name,
      image: imageUrl,
      description1: topic.description1,
      description2: topic.description2,
      description3: topic.description3,
      description4: topic.description4,
    });
    setTopic({
      id: "",
      name: "",
      image: "",
      description1: "",
      description2: "",
      description3: "",
      description4: "",
    });
    setImageUrl("");
    setDisabled(true);
    setProgress(0);
  };
  return (
    <div className="bigContainer">
      <div className="topicImageLoader">
        <form onSubmit={imageHandler}>
          <input type="file"></input>
          <button type="submit">Upload</button>
        </form>
        <h2>Uploaded {progress} %</h2>
      </div>
      <div className="topics">
        <div>
          <label htmlFor="id">
            Topic Id
            <input
              required
              type="text"
              id="id"
              value={topic.id}
              onChange={handleChange}
              placeholder="Topic Id"
            ></input>
          </label>
        </div>
        <div>
          <label htmlFor="name">
            Topic Names
            <input
              required
              type="text"
              id="name"
              value={topic.name}
              onChange={handleChange}
              placeholder="Topic Name"
            ></input>
          </label>
          <label htmlFor="image">
            Topic Image
            <input
              required
              disabled
              type="url"
              id="image"
              value={imageUrl}
              onChange={handleChange}
              placeholder="imageUrl"
            ></input>
          </label>
        </div>
        <div>
          <label htmlFor="description1">
            Description1
            <input
              required
              type="textarea"
              id="description1"
              value={topic.description1}
              onChange={handleChange}
              placeholder="desc1"
            ></input>
          </label>
          <label htmlFor="description2">
            Description2
            <input
              required
              type="textarea"
              id="description2"
              value={topic.description2}
              onChange={handleChange}
              placeholder="desc2"
            ></input>
          </label>
        </div>
        <div>
          <label htmlFor="description3">
            Description3
            <input
              required
              type="textarea"
              id="description3"
              value={topic.description3}
              onChange={handleChange}
              placeholder="desc3"
            ></input>
          </label>
          <label htmlFor="description4">
            Description4
            <input
              required
              type="textarea"
              id="description4"
              value={topic.description4}
              onChange={handleChange}
              placeholder="desc4"
            ></input>
          </label>
        </div>
        {error !== "" ? <h3>Something went wrong {error}</h3> : null}
        <div className="topAddButtonCont">
          <button disabled={disabled} onClick={add}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminTopics;
