import { get, post } from "./base";

export const getReview = (id) => {
  return get(`/review/${id}`);
};

export const getReviews = () => {
  return get(`/review/getall`);
};

export const addReviewPost = (payload) => {
  return post("/review/add", payload);
};

export const addComment = (id, payload) => {
  return post(`/review/comment/${id}`, payload);
};

export const getProfileReviews = (uid) => {
  return get(`/review/profile/${uid}`);
};
