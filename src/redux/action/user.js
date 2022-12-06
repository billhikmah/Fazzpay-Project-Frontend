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

export const getHistory = (page = 1, limit = 5, filter = "WEEK") => ({
  type: "GET_HISTORY",
  payload: axios.get(
    `/transaction/history?page=${page}&limit=${limit}&filter=${filter}`
  ),
});

export const updateImage = (formData, id) => ({
  type: "UPDATE_IMAGE",
  payload: axios.patch(`/user/image/${id}`, formData),
});

export const updatePhone = (formData, id) => ({
  type: "UPDATE_PHONE",
  payload: axios.patch(`/user/profile/${id}`, formData),
});

export const updatePassword = (formData, id) => ({
  type: "UPDATE_PASSWORD",
  payload: axios.patch(`/user/password/${id}`, formData),
});

export const checkPin = (pin) => ({
  type: "CHECK_PIN",
  payload: axios.get(`/user/pin/${pin}`),
});

export const updatePin = (formData, id) => ({
  type: "UPDATE_PIN",
  payload: axios.patch(`/user/pin/${id}`, formData),
});

export const deleteImage = (id) => ({
  type: "DELETE_IMAGE",
  payload: axios.delete(`/user/image/${id}`),
});
