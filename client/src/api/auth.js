import { post } from "./base";

export const addUser = (user) => {
  return post("/user/add", user);
};

export const updateUser = (data) => {
  return post("/user/update", data);
};
