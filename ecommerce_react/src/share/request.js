import axios from "axios";
import { getAccessToken, getRefreshToken, isEmptyOrNull, logout } from "./help";
import { message } from "antd";

const base_url = "http://localhost:8081/api/";

export const request = (url, method, param, new_token = null, data = {}) => {
  var access_token = getAccessToken();

  // if(new_token != null){
  //     access_token = new_token
  // }
  var header = { "Content-type": "application/json" };
  if (data instanceof FormData) {
    header["Content-Type"] = "multipart/form-data";
  }
  return axios({
    url: base_url + url,
    method: method,
    data: param,
    headers: {
      Authorization: "Bearer " + access_token,
      header,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      var status = error.response?.status;
      console.error(status);
      if (status === 404) {
        message.error("Route Not Found!");
      } else if (status === 401) {
        logout();
      } else if (status === 500) {
        // message.error(error.response.data.message);
        if (error.response.data.message && typeof error.response.data.message === "object") {
          Object.values(error.response.data.message).forEach((msg) => {
            message.error(msg);
          });
        } else {
          message.error(error.response.data.message);
        }
      } else {
        // message.error(error.response.data.message);
        if (error.response.data.message && typeof error.response.data.message === "object") {
          Object.values(error.response.data.message).forEach((msg) => {
            message.error(msg);
          });
        } else {
          message.error(error.response.data.message);
        }
      }
      return false;
    })
    .finally(() => {});
};
