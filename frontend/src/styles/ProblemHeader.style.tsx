import styled from "styled-components";
import {Link} from "react-router-dom";

export const HeaderContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 96px;
  height: 160px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    margin-right: 172px;
    height: 36px;

    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 32px;

      li {
        height: 24px;
        margin-left: 64px;

        .greater {
          margin-top: 2px;
          height: 24px;
          width: 12px;
        }

        a {
          text-decoration: none;
          font-weight: 700;
          font-size: 24px;
          color: #000000;
        } 
      }
    }
  }
`;

export const AnchorLogo = styled(Link)`
  font-weight: 700;
  font-size: 32px;
  cursor: pointer;
  text-decoration: none;
`;

export const GreenMark = styled.mark`
  color: #1f7a41;
  background: none;
`;

export const MenuContainer = styled.div`
  margin-bottom: 112px;

  button {
    cursor: pointer;
    font-family: Noto Sans KR, serif;
    font-weight: 500;
    font-size: 12px;
    border: none;
    background: none;

    &:nth-child(1) {
      border-right: solid 1px silver;
    }
  }
`;
