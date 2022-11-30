import {useSetRecoilState} from "recoil";
import {userState} from "../recoils";

export const logout = () => {
  const setUser = useSetRecoilState(userState);
  localStorage.removeItem('camperRankToken');
  localStorage.removeItem('camperID');
  localStorage.removeItem('camperRankTokenTime');
  setUser({
    token: "",
    isLoggedIn: false,
    ID: "",
  });
}

export const getLocalToken = () => {
  const token = localStorage.getItem('camperRankToken');
  const camperID = localStorage.getItem('camperID');
  const expirationTime = localStorage.getItem('camperRankTokenTime');
  return {token, camperID, expirationTime};
}

export const calculateRemainingTime = (expirationTime: string) => new Date().getTime() - new Date(expirationTime).getTime();

export const login = (accessToken: string, expirationTime: string, userId: string) => {
  const setUser = useSetRecoilState(userState);

  localStorage.setItem('camperRankToken', accessToken);
  localStorage.setItem('camperRankTokenTime', expirationTime);
  localStorage.setItem('camperID', userId);

  setUser({
    token: accessToken,
    isLoggedIn: true,
    ID: userId
  });
};