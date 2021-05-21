import { get, post } from "./base";

export const addTradePost = (payload) => {
  return post("/trade/add", payload);
};

export const getTrades = () => {
  return get("/trade/getall");
};
