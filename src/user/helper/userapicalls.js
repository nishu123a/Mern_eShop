import { API } from "../../backend";
export const resetPassword = (email) => {
    return fetch(`${API}/reset-password`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };
  