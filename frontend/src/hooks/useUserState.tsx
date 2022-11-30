import {useEffect} from "react";
import {calculateRemainingTime, getLocalToken, login, logout} from "../utils/userUtil";
import {useRecoilValue} from "recoil";
import {userState} from "../recoils";

export const setUserState = () => {
  const user = useRecoilValue(userState);
  useEffect(() => {
    const {token, camperID, expirationTime} = getLocalToken();
    const logoutCond = !token || !camperID || !expirationTime
      || calculateRemainingTime(expirationTime) <= 0;
    if (logoutCond) {
      if (user.isLoggedIn) {
        logout();
      }
      return;
    }
    if (user.isLoggedIn) {
      return;
    }
    login(token, expirationTime, camperID);
  }, []);
}

