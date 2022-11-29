import {atom} from "recoil";

interface userInfo {
  token: string,
  isLoggedIn: boolean,
  ID: string
}

export const userState = atom<userInfo>({
  key: "user",
  default: {
    token: "",
    isLoggedIn: false,
    ID: ""
  },
});
