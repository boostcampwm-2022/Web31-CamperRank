import {atom} from "recoil";

interface userInfo {
  token: string,
  isLoggedIn: boolean,
  ID: string
  numID?: number
}

export const userState = atom<userInfo>({
  key: "user",
  default: {
    token: "",
    isLoggedIn: false,
    ID: "",
    numID: 0,
  },
});
