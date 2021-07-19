import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

export default function CreatePost() {
  const history = useHistory("");
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if(imageUrl){
    fetch("http://localhost:5000/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        body: description,
        photo: imageUrl,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          setError(data.error);
        } else {
          // setError(data.msg)
          history.push("/");
        }
      });
    }
  },[imageUrl])

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "narayan");
    fetch(process.env.REACT_APP_CLOUDNARY_API, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data.url);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    
  };
  return (
    <div>
      <div>
        {error && <Alert severity="warning">{error}</Alert>}
        <textarea
          type="text"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          //   value={description}
          placeholder="description"
        />
      </div>
      <div>
        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
          //   value={image}
        />
      </div>

      <button type="submit" onClick={() => postDetails()}>
        Create Post
      </button>
    </div>
  );
}
