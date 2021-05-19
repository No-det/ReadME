import { get } from "./base";

export const getReview = (id) => {
  return get(`/review/${id}`);
};
