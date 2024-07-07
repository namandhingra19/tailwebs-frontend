import axios from "axios";

export const signup = async (email: string, password: string) => {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, {
    email,
    password,
  });
};

export const login = async (email: string, password: string) => {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
    email,
    password,
  });
};

export const logout = async () => {
  return axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`);
};
