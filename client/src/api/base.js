import axios from "axios";

import { auth } from "../firebase/firebase";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const base = async (options) => {
  const token = await auth.currentUser.getIdToken();
  return axios({
    baseURL,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...options,
  })
    .then((res) => res.data)
    .catch((err) => {
      console.log("err", err.response);
      throw err.response;
    });
};

export const get = (url, params) => {
  const options = {
    method: "get",
    url,
    params,
  };
  return base(options);
};

export const patch = (url, data) => {
  const options = {
    method: "patch",
    url,
    data,
  };
  return base(options);
};

export const post = (url, data) => {
  const options = {
    method: "post",
    url,
    data,
  };
  return base(options);
};

export const put = (url, data) => {
  const options = {
    method: "put",
    url,
    data,
  };
  return base(options);
};

export const del = (url, data) => {
  const options = {
    method: "delete",
    url,
    data,
  };
  return base(options);
};
