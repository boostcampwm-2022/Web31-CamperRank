import styled from 'styled-components';

export const InputFormContainer = styled.form`
  width: 43rem;
  height: 18.5rem;
  background: #cfe4b5;
  box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 1.5rem 1.5rem 4.5rem;
  font-weight: 400;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  button {
    background: #e1ebdb;
    border: 2px solid #aeaeae;
    border-radius: 10px;
    width: 7rem;
    height: 2.5rem;
    font-size: 0.9rem;

    &:hover {
      background: #c2d5b7;
      border: none;
      box-shadow: 1px 1px 1px 1px #b9b9b9;
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
    border: 3px solid #9ccaaf;
    border-radius: 10px;
    width: 16rem;
    height: 2.5rem;

    &::placeholder {
      font-weight: 300;
      font-size: 1rem;
      text-align: center;
      color: #919191;
    }
  }

  p {
    margin-right: 1rem;
  }
`;

export const PasswordInputContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-right: 11rem;
  input {
    background: #f1f9eb;
    border: 3px solid #9ccaaf;
    border-radius: 10px;
    width: 16rem;
    height: 2.5rem;

    &::placeholder {
      font-weight: 300;
      font-size: 14px;
      text-align: center;
      color: #919191;
    }
  }

  p {
    margin-right: 1rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 0.8rem;
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
