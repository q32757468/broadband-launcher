import axios from "axios";
import qs from "qs";

export const loginBroadband = (data: { username: string; password: string }) =>
  axios({
    url: "http://192.168.167.46/70.htm",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    transformRequest: [(data) => qs.stringify(data)],
    responseType: "arraybuffer",
    data: {
      DDDDD: data.username,
      upass: data.password,
      R1: "0",
      R2: "",
      R6: "0",
      para: "00",
      "0MKKey": "123456",
      buttonClicked: "",
      redirect_url: "",
      err_flag: "",
      username: "",
      password: "",
      user: "",
      cmd: "",
      Login: "",
    },
  });
