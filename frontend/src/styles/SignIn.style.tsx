import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const InputFormContainer = styled.form`
  width: 38rem;
  height: 18rem;
  background: #f9fffa;
  box-shadow: 0px 6px 16px 0px #c4e6cd;
  margin-top: 3rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  font-weight: 400;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.8rem;
  position: relative;

  button {
    position: absolute;
    bottom: 1.5rem;
    right: 7rem;
    background: #c4e6cd;
    border: 2px solid #f0f0f0;
    border-radius: 10px;
    cursor: pointer;
    width: 7.6rem;
    height: 2.7rem;
    float: right;
    font-size: 1.2rem;
    &:hover {
      background: #b2dcbd;
      border: none;
      font-weight: bold;
      box-shadow: 2px 2px 1px 1px #b9b9b9;
    }
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    position: absolute;
    bottom: 16px;
    right: 104px;
    width: 112px;
    height: 40px;
  }
`;

export const IDInputContainer = styled.div`
  display: flex;
  justify-content: right;

  input {
    margin-right: 5rem;
    background: #f1f9eb;
    border: 3px solid #c4e6cd;
    border-radius: 10px;
    width: 16rem;
    height: 2.5rem;
    &::placeholder {
      font-weight: 300;
      font-size: 1rem;
      text-align: center;
      color: #919191;
    }
    &:hover {
      border: 3px solid #9fcdab;
    }
  }

  p {
    margin-right: 1rem;
  }
`;

export const PasswordInputContainer = styled.div`
  display: flex;
  justify-content: right;

  input {
    margin-right: 5rem;
    background: #f1f9eb;
    border: 3px solid #c4e6cd;
    border-radius: 10px;
    width: 16rem;
    height: 2.5rem;
    &:hover {
      border: 3px solid #9fcdab;
    }
  }

  p {
    margin-right: 1rem;
  }

  margin-bottom: 4rem;
`;

export const AnchorLogo = styled(Link)`
  font-weight: 700;
  font-size: 3.5rem;
  cursor: pointer;
  text-decoration: none;
`;

export const GreenMark = styled.mark`
  color: #1f7a41;
  background: none;
`;

export const TextLink = styled(Link)`
  font-weight: 500;
  font-size: 1.6rem;
  cursor: pointer;
  text-decoration: none;
  display: block;
  margin-top: 2rem;
  color: #5a956a;
`;

export const InfoContainer = styled.div`
  text-align: center;
`;
