import { get, post } from "./base";

export const addUser = (user) => {
  return post("/user/add", user);
};

export const updateUser = (data) => {
  return post("/user/update", data);
};

export const getUser = (uid) => {
  return get(`/user/${uid}`);
};

export const updateChatMembers = (uid) => {
  return get(`/user/chat/${uid}`);
};
