import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MainHeaderContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-width: 80rem;
  padding: 0 6rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  nav {
    margin-right: 11rem;

    ul {
      justify-content: space-between;
      align-items: center;

      li {
        display: inline;
        margin-left: 6rem;

        a {
          text-decoration: none;
          font-weight: 600;
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
  margin-bottom: 7rem;

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
