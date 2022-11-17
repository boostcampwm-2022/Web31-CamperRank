import {
  MainHeaderContainer,
  AnchorLogo,
  GreenMark,
  MenuContainer,
} from "../styles/MainHeader.style";
import { Link } from "react-router-dom";

export const MainHeader = () => {
  //isloggedin 필요
  return (
    <MainHeaderContainer>
      <AnchorLogo>
        <Link to="/" style={{ textDecoration: "none" }}>
          Camper<GreenMark>Rank</GreenMark>
        </Link>
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
        <Link to="/signup">
          <button type={"button"}>{"회원가입"}</button>
        </Link>
        <Link to="/signin">
          <button type={"button"}>{"로그인"}</button>
        </Link>
      </MenuContainer>
    </MainHeaderContainer>
  );
};
