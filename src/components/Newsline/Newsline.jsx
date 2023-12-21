import Post from "../Post/Post";
import "./Newsline.scss";
import { deleteTodo, updatePost } from "../../api/post";

function Newsline({
  isLoading,
  postsIds,
  isError,
  postsById,
  setPostsIds,
  setPostsById,
}) {
  function handleDeletePost(id) {
    setPostsIds(postsIds.filter((postId) => postId !== id));
    deleteTodo(id);
  }

  function handleTogglePost(id) {
    const post = {
      ...postsById[id],
      completed: !postsById[id].completed,
    };

    setPostsById({
      ...postsById,
      [id]: post,
    });

    updatePost(post);
  }

  return (
    <div className="newsline">
      <p className="newsline__title">Лента</p>
      {isError && "Нет ответа от сервера"}
      {isLoading && (
        <span className="newsline__discription">Тут пока пусто...</span>
      )}
      <ul className="posts">
        {postsIds &&
          postsIds.map((id) => (
            <Post
              post={postsById[id]}
              key={id}
              onDelete={() => handleDeletePost(id)}
              onToggle={() => handleTogglePost(id)}
            />
          ))}
      </ul>
    </div>
  );
}

export default Newsline;
