import React, { useState, useEffect } from "react";
import { storage } from "../databaseConfig";
import * as UserActions from "../store/actions/user";
import { useDispatch, useSelector } from "react-redux";

const { forwardRef, useRef, useImperativeHandle } = React;
const ImageUpload = forwardRef((props, ref) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [fileInput, setFileInput] = useState(null);
  const dispatch = useDispatch();
  const User = useSelector((state) => state.user.user);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const onSubmit = () => {
    fileInput.click();
  };
  useImperativeHandle(ref, () => ({
    onSubmit,
  }));

  useEffect(() => {
    handleUpload();
  }, [image]);

  const handleUpload = () => {
    if (image !== null) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
              dispatch(UserActions.addProfile(User.id, url));
            });
        }
      );
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleChange}
        style={{ display: "none" }}
        ref={(fileInput) => setFileInput(fileInput)}
      />
    </div>
  );
});

export default ImageUpload;
