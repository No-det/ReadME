import { get, post } from "./base";

export const getReviewTrades = (uid) => {
  return get(`/user/profileData/${uid}`);
};

export const follow = (payload) => {
  return post("/user/follow", payload);
};
