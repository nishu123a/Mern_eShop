import { API } from "../../backend";

export const signup = user => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.error(err)); // Use console.error for errors
};

export const signin = user => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.error(err)); // Use console.error for errors
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = next => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    // Use a function expression here for consistency
    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then(response => response.json()) // Parse response as JSON
      .then(data => console.log("signout success", data))
      .catch(err => console.error(err)); // Use console.error for errors
  }
};

export const isAutheticated = () => {
  if (typeof window === "undefined") {
    return false;
  }
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    return JSON.parse(jwt);
  } else {
    return false;
  }
};
