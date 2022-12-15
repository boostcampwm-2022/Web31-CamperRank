import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 6rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    height: 2.5rem;

    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 3rem;

      li {
        height: 2rem;
        margin-left: 2rem;
        min-width: 9rem;
        width: 9rem;

        .greater {
          margin-top: 0.4rem;
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

      li:nth-child(2) {
        min-width: 2rem;
        width: 2rem;
      }

      li:nth-child(3) {
        width: auto;
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
  min-width: 8rem;
  width: 8rem;

  button {
    cursor: pointer;
    font-family: Noto Sans KR, sans-serif;
    font-weight: 500;
    font-size: 0.7rem;
    border: none;
    background: none;
    min-width: 4rem;
  }

  a:nth-child(1) {
    button {
      border-right: solid 1px silver;
    }
  }
`;
