export function getNormalizePosts(postsList) {
  const ids = [];
  const byIds = {};

  postsList.map((post) => {
    ids.push(post.id);
    byIds[post.id] = post;
  });

  return [ids, byIds];
}
