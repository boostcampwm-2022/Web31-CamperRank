import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-width: 80rem;
  padding: 0 6rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    margin-right: 11rem;
    height: 2.5rem;

    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 2rem;

      li {
        height: 1.5rem;
        margin-left: 4rem;

        .greater {
          margin-top: 2px;
          height: 1.5rem;
          width: 0.75rem;
        }

        a {
          text-decoration: none;
          font-weight: 700;
          font-size: 1.5rem;
          color: #000000;
        }
      }
    }
  }
`;

export const AnchorLogo = styled(Link)`
  font-weight: 700;
  font-size: 2rem;
  cursor: pointer;
  text-decoration: none;
`;

export const GreenMark = styled.mark`
  color: #1f7a41;
  background: none;
`;

export const MenuContainer = styled.div`
  margin-bottom: 2rem;

  button {
    cursor: pointer;
    font-family: Noto Sans KR, sans-serif;
    font-weight: 500;
    font-size: 0.7rem;
    border: none;
    background: none;
  }

  a:nth-child(1) {
    button {
      border-right: solid 1px silver;
    }
  }
`;
