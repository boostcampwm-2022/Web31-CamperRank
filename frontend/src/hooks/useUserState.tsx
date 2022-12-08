import { useCallback, useEffect } from 'react';
import {
  calculateRemainingTime,
  getLocalToken,
  removeLocalToken,
  setLocalToken,
} from '../utils/userUtil';
import { useRecoilState } from 'recoil';
import { userState } from '../recoils';

let logoutTimer: any;
// const URL = import.meta.env.VITE_SERVER_URL;
export const useUserState = () => {
  const [user, setUser] = useRecoilState(userState);
  const { token, camperID, expirationTime } = getLocalToken();
  const remainingTime =
    expirationTime === null ? 0 : calculateRemainingTime(expirationTime);

  const logoutHandler = useCallback(() => {
    removeLocalToken();
    setUser({
      token: '',
      isLoggedIn: false,
      ID: '',
    });
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = useCallback(
    (token: string, expirationTime: string, camperID: string) => {
      const remainingTime =
        expirationTime === null ? 0 : calculateRemainingTime(expirationTime);
      // @ts-ignore
      setLocalToken(token, expirationTime, camperID);
      setUser({
        // @ts-ignore
        token,
        isLoggedIn: true,
        // @ts-ignore
        ID: camperID,
      });
      logoutTimer = setTimeout(logoutHandler, remainingTime);
    },
    [],
  );

  useEffect(() => {
    const logoutCond =
      !token || !camperID || !expirationTime || remainingTime <= 0;
    if (logoutCond) {
      if (user.isLoggedIn) {
        logoutHandler();
      }
      return;
    }
    if (user.isLoggedIn) {
      return;
    }
    loginHandler(token, expirationTime, camperID);
  }, []);

  // useEffect(() => {
  //   if (!user.isLoggedIn || !user.ID || !user.token) {
  //     return;
  //   }
  //   fetch(`${URL}/auth/jwtLogin`, {
  //     method: 'POST',
  //     headers: {
  //       Authorization: 'Bearer ' + user.token,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(user.token);
  //       console.log(res.userId);
  //       console.log(user.ID);
  //       if (res.userId === user.ID) {
  //         return;
  //       }
  //       logoutHandler();
  //     });
  // }, []);

  return {
    user,
    loginHandler,
    logoutHandler,
  };
};
