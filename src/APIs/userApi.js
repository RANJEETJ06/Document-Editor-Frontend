import axios from "axios";

const API_BASE_URL = "http://localhost:8800/api/users"; // adjust if your backend runs on a different port

export const fetchUser = async () => {
  try {
    const response = await axios.get(
      API_BASE_URL + "/fetcher", { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const loginUser = "http://localhost:8800/oauth2/authorization/google";
export const logout = () => {
  window.location.href = "http://localhost:8800/logout";
};
