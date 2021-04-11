import { loginBroadband } from "./api";
import iconv from "iconv-lite";
import random from "lodash/random";
import fs from "fs";
import path from "path";

interface LoginConfig {
  username: string;
  password: string;
}

const getConfig = async () => {
  try {
    const rawData = await fs.promises.readFile(
      path.join(process.cwd(), "config.json"),
      "utf8"
    );
    const config = JSON.parse(rawData);
    return config;
  } catch (error) {
    throw error;
  }
};

const delayDestroy = (secs: number) => {
  console.log(`该窗口${secs}s后关闭...`);
  setTimeout(() => {}, secs * 1000);
};

const loginAttemp = async () => {
  let config: LoginConfig;

  try {
    config = await getConfig();

    try {
      const { data: resData } = await loginBroadband({
        username: config.username,
        password: config.password,
      });

      const str = iconv.decode(Buffer.from(resData), "gb2312");
      const html = iconv.encode(str, "utf8").toString();

      if (html.includes("信息页")) {
        console.log("当前为信息页，再次登录中...");
        setTimeout(() => {
          loginAttemp();
        }, random(1000, 2000));
      } else if (html.includes("认证成功页")) {
        console.log("登录成功!");
        delayDestroy(3);
      } else {
        console.log("登录失败，未知原因!");
        delayDestroy(3);
      }
    } catch (error) {
      console.log("网络连接失败!");
      console.log("请确保在相应网络内");
      delayDestroy(3);
    }
  } catch (error) {
    console.log("未找到配置文件config.json，请创建该文件并正确填写配置!");
    delayDestroy(3);
  }
};

loginAttemp();
