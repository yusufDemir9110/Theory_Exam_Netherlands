import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import db, { storage } from "../../../firebase/firebase";

const Slider = ({ language }) => {
  const [slideItem, setSlideItem] = useState({
    highLight: "",
    image: "",
    description: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    slideItem[e.target.id] = e.target.value;
    setSlideItem({ ...slideItem, slideItem });

    if (imageUrl !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  const imageHandler = (e) => {
    e.preventDefault();
    const image = e.target[0].files[0];
    uploadImages(image);
  };

  const uploadImages = (image) => {
    const storageRefLes = ref(storage, `/slider/${language}/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRefLes, image);
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
    await addDoc(collection(db, `slider-data-${language}`), {
      highLight: slideItem.highLight,
      image: imageUrl,
      description: slideItem.description,
    });
    setSlideItem({
      highLight: "",
      description: "",
      image: "",
    });
    setImageUrl("");
    setDisabled(true);
    setProgress(0);
  };

  return (
    <div className="bigContainer">
      <h1>Slider</h1>
      <h2>{language}</h2>

      <div>
        <div>
          <form onSubmit={imageHandler}>
            <input type="file"></input>
            <button type="submit">Upload</button>
          </form>
          <h2>Uploaded {progress} %</h2>
        </div>
        <input
          required
          type="text"
          id="highLight"
          value={slideItem.highLight}
          onChange={handleChange}
          placeholder="highLight"
        ></input>
        <input
          required
          disabled
          type="url"
          id="image"
          value={imageUrl}
          onChange={handleChange}
        ></input>
        <input
          required
          type="text"
          id="description"
          value={slideItem.description}
          onChange={handleChange}
          placeholder="description"
        ></input>
        {error !== "" ? <h3>Something went wrong {error}</h3> : null}
        <button disabled={disabled} onClick={add}>
          Add
        </button>
      </div>
    </div>
  );
};

export default Slider;
