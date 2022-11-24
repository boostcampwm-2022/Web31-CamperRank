import {
  HeaderContainer,
  AnchorLogo,
  GreenMark,
  MenuContainer,
} from "../styles/ProblemHeader.style";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoils/userState";
import React, { useCallback } from "react";
import { ReactComponent as Greater } from "../assets/Greater.svg";

interface propsType {
  URL: string;
  problemName: string;
  type: Number;
  //0: 문제풀이 페이지
  //1: 질문 페이지
}

export const ProblemHeader = ({ URL, problemName, type }: propsType) => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const handleLogoutClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!user.isLoggedIn) {
        return;
      }
      setUser({
        token: "",
        isLoggedIn: false,
        ID: "",
      });
      localStorage.removeItem("camperRankToken");
      navigate(import.meta.env.VITE_SERVER_URL + "/problems");
    },
    [user, setUser]
  );

  return (
    <HeaderContainer>
      <AnchorLogo to={"/"}>
        Camper<GreenMark>Rank</GreenMark>
      </AnchorLogo>
      <div>
        <ul>
          <li>
            <Link to="/problems">문제 리스트</Link>
          </li>
          <li>
            <Greater className={"greater"} />
          </li>
          <li>
            <Link to={URL}>{problemName}</Link>
          </li>
          {!!type && (
            <>
              <li>
                <Greater className={"greater"} />
              </li>
              <li>
                <Link to={URL + "/question"}>질문</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <MenuContainer>
        <Link to={user.isLoggedIn ? "/profile" : "/signup"}>
          <button type={"button"}>
            {user.isLoggedIn ? user.ID : "회원가입"}
          </button>
        </Link>
        <Link to={user.isLoggedIn ? "/" : "/signin"}>
          <button type={"button"} onClick={handleLogoutClick}>
            {user.isLoggedIn ? "로그아웃" : "로그인"}
          </button>
        </Link>
      </MenuContainer>
    </HeaderContainer>
  );
};
