import axios from "axios";
const newsApi = axios.create({
  baseURL: "https://news-api-get0.onrender.com/",
});

export function getTopics() {
  return newsApi.get("api/topics").then((response) => {
    return response.data.topics;
  });
}

export function getArticles(
  topic = null,
  sort_by = "created_at",
  order = "desc"
) {
  return newsApi
    .get("api/articles", {
      params: {
        ...(topic && { topic: topic }),
        sort_by: sort_by,
        order: order,
      },
    })
    .then((response) => {
      return response.data.articles;
    });
}

export function getArticleById(articleId) {
  return newsApi.get(`/api/articles/${articleId}`).then((response) => {
    return response.data.article;
  });
}

export function getCommentsForArticle(articleId) {
  return newsApi.get(`/api/articles/${articleId}/comments`).then((response) => {
    return response.data.comments;
  });
}

export function patchArticle(articleId, inc_votes) {
  return newsApi
    .patch(`/api/articles/${articleId}`, { inc_votes: inc_votes })
    .then((response) => {
      return response.data.article;
    });
}

export function postComment(articleId, username, comment) {
  return newsApi
    .post(`/api/articles/${articleId}/comments`, {
      username: username,
      body: comment,
    })
    .then((response) => {
      return response.data.comment;
    });
}

export function getUsers() {
  return newsApi.get("api/users").then((response) => {
    return response.data.users;
  });
}
