import { useState, useEffect } from "react";
import Newsline from "./components/Newsline/Newsline";
import { getPosts } from "./api/post";
import { getNormalizePosts } from "./utils/normalize-posts";
import AddPost from "./components/AddPost/AddPost";

function App() {
  const [postsIds, setPostsIds] = useState(null);
  const [postsById, setPostsById] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    getPosts()
      .then((posts) => {
        const [ids, byIds] = getNormalizePosts(posts);

        setIsLoading(false);
        setPostsIds(ids);
        setPostsById(byIds);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  return (
    <main className="main">
      <AddPost
        postsById={postsById}
        setPostsById={setPostsById}
        setPostsIds={setPostsIds}
        postsIds={postsIds}
      />
      {
        <Newsline
          isLoading={isLoading}
          postsById={postsById}
          postsIds={postsIds}
          isError={isError}
          setPostsIds={setPostsIds}
          setPostsById={setPostsById}
        />
      }
    </main>
  );
}

export default App;
