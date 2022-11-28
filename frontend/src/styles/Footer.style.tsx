import styled from "styled-components";

export const FooterContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 96px;
  padding-bottom: 96px;
`;

export const KeyPhrase = styled.p`
  width: 100%;
  font-weight: 700;
  font-size: 32px;
  text-align: center;
  color: #0A142F;
`;

export const MainText = styled.p`
  width: 100%;
  font-weight: 500;
  font-size: 16px;
  color: #0A142F;
  opacity: 0.8;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  a {
    cursor: pointer;
    width: 112px;
    height: 36px;
    box-sizing: border-box;
    background: #F7F9FB;
    border: 1px solid #888888;
    border-radius: 20px;
    text-decoration: none;
    font-family: Noto Sans KR, sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 8px;
  }
`;