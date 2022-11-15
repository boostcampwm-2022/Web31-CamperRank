import styled from "styled-components";

export const MainHeaderContainer = styled.div`
  box-sizing: border-box;
  width: 100vw;
  padding: 0 96px;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    margin-right: 128px;
    ul {
      justify-content: space-between;
      align-items: center;

      li {
        display: inline;
        margin-left: 96px;

        a {
          text-decoration: none;
          font-weight: 600;
          font-size: 24px;
          color: #000000;
        }
      }
    }
  }
`;

export const AnchorLogo = styled.a`
  font-weight: 700;
  font-size: 32px;
`;

export const GreenMark = styled.mark`
  color: #1F7A41;
  background: none;
`;

export const MenuContainer = styled.div`
  margin-bottom: 64px;
  button{
    cursor: pointer;
    font-family: Noto Sans KR,serif;
    font-weight: 500;
    font-size: 12px;
    border: none;
    background: none;
    &:nth-child(1){
      border-right: solid 1px silver;
    };
  }
`;
