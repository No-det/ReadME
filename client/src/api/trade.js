import { post } from "./base";

export const addTradePost = (payload) => {
  return post("/trade/add", payload);
};
