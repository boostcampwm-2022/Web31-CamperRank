import styled from "styled-components";

export const InputFormContainer = styled.form`
  width: 720px;
  height: 296px;
  background: #CFE4B5;
  box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin-top: 32px;
  margin-bottom: 32px;
  padding: 24px 24px 72px;
  font-weight: 400;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  
  button {
    background: #E1EBDB;
    border: 2px solid #AEAEAE;
    border-radius: 10px;
    cursor: pointer;
    width: 112px;
    height: 40px;
  }
`;

export const IDInputContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-right: 48px;
  input {
    margin-right: 16px;
    background: #F1F9EB;
    border: 3px solid #9CCAAF;
    border-radius: 10px;
    width: 256px;
    height: 36px;
  }
  p {
    margin-right: 16px;
  }
`;

export const PasswordInputContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-right: 176px;
  input {
    background: #F1F9EB;
    border: 3px solid #9CCAAF;
    border-radius: 10px;
    width: 256px;
    height: 36px;
  }
  p {
    margin-right: 16px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 12px;
  right: 200px;
  width: 256px;
`;

export const CheckButton = styled.button`
  background: #E1EBDB;
  border: 2px solid #AEAEAE;
  border-radius: 10px;
  cursor: pointer;
  width: 88px;
  height: 36px;
`;