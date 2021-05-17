import { post } from "./base";

export const addUser = (user) => {
  return post("/v1/addUser", user);
};
