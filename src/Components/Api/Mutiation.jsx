const { VITE_Base_Url } = import.meta.env;
import axios from "axios";

export const User_login = async (data) => {
  // console.log("call", data);
  return await axios.post(`${VITE_Base_Url}/api/Login`, data);
};

export const User_signUp = async (data) => {
  return await axios.post(`${VITE_Base_Url}/api/sign`, data);
};

export const Admin_signUp = async (data) => {
  return await axios.post(`${VITE_Base_Url}/api/adminSign`, data);
};

export const Log_out = async (Id) => {
  console.log(Id);
  return await axios.post(`${VITE_Base_Url}/api/logout/${Id}`);
};
