import { post } from "./base";

export const addUser = (user) => {
  return post("/user/add", user);
};
