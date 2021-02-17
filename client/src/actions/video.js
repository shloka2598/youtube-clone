import fetch from "isomorphic-fetch";
import { API_URL } from "../secrets";

export const videoFileUpload = (file, token) => {
  return fetch(`${API_URL}/video/upload`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: file,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const videoDetailsUpload = (data, token) => {
  return fetch(`${API_URL}/video/uploadDetails`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const increaseSubscribers = (data, token) => {
  return fetch(`${API_URL}/subscribe`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getSubscribers = (data) => {
  return fetch(`${API_URL}/subscribers`, {
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

export const getSingleVideo = (data) => {
  return fetch(`${API_URL}/video/single`, {
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

export const increaseSingleVideoView = (data) => {
  return fetch(`${API_URL}/video/increaseView`, {
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

export const listVideos = () => {
  return fetch(`${API_URL}/videos`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
