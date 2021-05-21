import { get } from "./base";

export const getReviewTrades = (uid) => {
  return get(`/user/profileData/${uid}`);
};
