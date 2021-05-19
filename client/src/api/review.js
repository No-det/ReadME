import { get, post } from "./base";

export const getReview = (id) => {
  return get(`/review/${id}`);
};

export const getReviews = (uid) => {
  return get(`/review/getall/${uid}`);
};

export const addReviewPost = (payload) => {
  return post("/review/add", payload);
};
