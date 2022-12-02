import {
  MainHeaderContainer,
  AnchorLogo,
  GreenMark,
  MenuContainer,
} from "../styles/MainHeader.style";
import {Link} from "react-router-dom";
import {useRecoilState} from "recoil";
import {userState} from "../recoils";
import React, {useCallback} from "react";
import {useUserState} from "../hooks/useUserState";

export const MainHeader = () => {
  const [user, setUser] = useRecoilState(userState);
  const {logoutHandler} = useUserState();
  const handleLogoutClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!user.isLoggedIn) {
      return;
    }
    logoutHandler();
  }, [user, setUser, user.isLoggedIn]);

  return (
    <MainHeaderContainer>
      <AnchorLogo to={"/"}>
        Camper<GreenMark>Rank</GreenMark>
      </AnchorLogo>
      <nav>
        <ul>
          <li>
            <Link to="/problems">문제 리스트</Link>
          </li>
          <li>
            <Link to="/ranking">랭킹</Link>
          </li>
          <li>
            <Link to="/contest">대회</Link>
          </li>
        </ul>
      </nav>
      <MenuContainer>
        <Link to={user.isLoggedIn ? "/profile" : "/signup"}>
          <button type={"button"}>{user.isLoggedIn ? user.ID : "회원가입"}</button>
        </Link>
        <Link to={user.isLoggedIn ? "" : "/signin"}>
          <button type={"button"} onClick={handleLogoutClick}>{user.isLoggedIn ? "로그아웃" : "로그인"}</button>
        </Link>
      </MenuContainer>
    </MainHeaderContainer>
  );
};
