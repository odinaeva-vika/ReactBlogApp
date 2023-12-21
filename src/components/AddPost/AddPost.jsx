import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addPost } from "../../api/post";
import "./AddPost.scss";

function AddPost({ postsById, setPostsById, setPostsIds, postsIds }) {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [titleLengthError, setTitleLengthError] = useState("");
  const [bodyLengthError, setBodyLengthError] = useState("");

  const error = "Заполните поля";
  const date = new Date().toLocaleDateString();
  const options = { hour: "numeric", minute: "numeric" };
  const time = new Date().toLocaleTimeString([], options);

  function handlePostTitleChange(e) {
    setPostTitle(e.target.value);

    if (e.target.value.length > 100) {
      setTitleLengthError("Заголовок больше 100 символов");
    } else {
      setTitleLengthError("");
    }
  }

  function handlePostBdyChange(e) {
    setPostBody(e.target.value);

    if (e.target.value.length > 200) {
      setBodyLengthError("Текст больше 200 символов");
    } else {
      setBodyLengthError("");
    }
  }

  function handleAddPostBtnClick(event) {
    event.preventDefault();

    const id = uuidv4();
    const post = {
      id: id,
      date: date,
      time: time,
      title: postTitle,
      body: postBody,
      completed: false,
    };

    if (post.title === "" || post.body === "") {
      alert(error);
    } else if (postTitle.length > 100 || postBody.length > 200) {
      return;
    } else {
      setPostsById({
        ...postsById,
        [post.id]: post,
      });

      setPostsIds([post.id, ...postsIds]);

      addPost(post);

      setPostTitle("");
      setPostBody("");
    }
  }

  return (
    <div className="new-post">
      <p className="new-post__title">Новый пост</p>
      <form className="form" action="">
        <input
          className="form__input"
          value={postTitle}
          onChange={(e) => handlePostTitleChange(e)}
          type="text"
          placeholder="Заголовок"
        />

        {titleLengthError && <p>Заголовок больше 100 символов</p>}
        <textarea
          className="form__textarea"
          placeholder="Напиши пост"
          value={postBody}
          onChange={(e) => handlePostBdyChange(e)}
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
        {bodyLengthError && <p>Текст больше 200 символов</p>}
        <button
          className="form__btn"
          onClick={handleAddPostBtnClick}
          type="submit"
        >
          Опубликовать
        </button>
      </form>
    </div>
  );
}

export default AddPost;
