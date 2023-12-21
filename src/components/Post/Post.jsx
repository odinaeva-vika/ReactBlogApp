import "./Post.scss";
function Post({ post, onDelete }) {
  return (
    <li className="post">
      <time className="lenta-box__time">
        {post.date} {post.time}
      </time>
      <h2 className="post__title">{post.title}</h2>
      {/* <input type="checkbox" checked={post.completed} onChange={onToggle} /> */}
      <p className="post__text">{post.body}</p>
      <button onClick={onDelete}>X</button>
    </li>
  );
}

export default Post;
