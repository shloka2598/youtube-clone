import fetch from "isomorphic-fetch";
import { API_URL } from "../secrets";

export const getSingleUser = (data) => {
  return fetch(`${API_URL}/user/single`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
