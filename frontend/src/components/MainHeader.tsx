import {MainHeaderContainer, AnchorLogo, GreenMark, MenuContainer} from "../styles/MainHeader.style";

export const MainHeader = () => {
  //isloggedin 필요
  return (
    <MainHeaderContainer>
      <AnchorLogo>
        Camper<GreenMark>Rank</GreenMark>
      </AnchorLogo>
      <nav>
        <ul>
          <li><a href="/html/intro">문제 리스트</a></li>
          <li><a href="/css/intro">랭킹</a></li>
          <li><a href="/javascript/intro">대회</a></li>
        </ul>
      </nav>
      <MenuContainer>
        <button type={"button"}>{"회원가입"}</button>
        <button type={"button"}>{"로그인"}</button>
      </MenuContainer>
    </MainHeaderContainer>
  );
}
