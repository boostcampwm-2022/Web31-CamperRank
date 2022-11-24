import styled from "styled-components";

export const InputFormContainer = styled.form`
  width: 600px;
  height: 264px;
  background: #CFE4B5;
  box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin-top: 32px;
  margin-bottom: 32px;
  padding: 24px;
  font-weight: 400;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  
  button{
    position: absolute;
    bottom: 16px;
    right: 104px;
    background: #E1EBDB;
    border: 2px solid #AEAEAE;
    border-radius: 10px;
    cursor: pointer;
    width: 112px;
    height: 40px;
    float: right;
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
    margin-right: 80px;
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

  input {
    margin-right: 80px;
    background: #F1F9EB;
    border: 3px solid #9CCAAF;
    border-radius: 10px;
    width: 256px;
    height: 36px;
  }

  p {
    margin-right: 16px;
  }

  margin-bottom: 64px;
`;