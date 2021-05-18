import { post } from "./base";

export const addUser = (user) => {
  return post("/addUser", user);
};
