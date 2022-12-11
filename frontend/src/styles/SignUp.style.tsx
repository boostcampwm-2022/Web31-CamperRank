import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const InputFormContainer = styled.form`
  width: 44rem;
  height: 21rem;
  background: #f9fffa;
  box-shadow: 0px 6px 16px 0px #c4e6cd;
  margin-top: 3rem;
  margin-bottom: 2rem;
  padding: 1.6rem 1.5rem 4.5rem;
  font-weight: 400;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.8rem;
  position: relative;

  button {
    background: #c4e6cd;
    border: 2px solid #f0f0f0;
    border-radius: 10px;
    width: 7rem;
    height: 2.5rem;
    font-size: 1rem;
    color: #0f5e29;
    &:hover {
      background: #b2dcbd;
      border: none;
      font-weight: bold;
      font-size: 1rem;
      box-shadow: 2px 2px 1px 1px #b9b9b9;
    }
  }
`;

export const IDInputContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-right: 3rem;
  input {
    margin-right: 1rem;
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
    color: #186e35;
  }
`;

export const PasswordInputContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-right: 11rem;
  input {
    background: #f1f9eb;
    border: 3px solid #c4e6cd;
    border-radius: 10px;
    width: 16rem;
    height: 2.5rem;

    &::placeholder {
      font-weight: 300;
      font-size: 14px;
      text-align: center;
      color: #919191;
    }
    &:hover {
      border: 3px solid #9fcdab;
    }
  }

  p {
    margin-right: 1rem;
    color: #186e35;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 1.2rem;
  right: 12.5rem;
  width: 16rem;
`;

export const CheckButton = styled.button`
  background: #e1ebdb;
  border: 2px solid #aeaeae;
  border-radius: 10px;
  width: 4rem;
  height: 2.5rem;
`;

export const LightContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  font-size: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1rem;
  position: absolute;
  filter: invert(0.9);
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
