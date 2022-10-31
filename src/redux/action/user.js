import axios from "src/utility/axiosClient";

export const signinAction = (body) => ({
  type: "SIGNIN",
  payload: axios.post("/auth/login", body),
});

export const getUserAction = (id) => ({
  type: "GET_USER",
  payload: axios.get(`/user/profile/${id}`),
});

export const getDashboard = (id) => ({
  type: "DASHBOARD",
  payload: axios.get(`/dashboard/${id}`),
});

export const logoutAction = () => ({
  type: "LOGOUT",
  payload: axios.delete(`/api/auth`),
});

export const getHistory = () => ({
  type: "GET_HISTORY",
  payload: axios.get(`/transaction/history?page=1&limit=100&filter=MONTH`),
});
