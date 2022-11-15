import styled from "styled-components";

export const FooterContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100vw;
  text-align: center;
`;

export const KeyPhrase = styled.p`
  width: 100%;
  font-weight: 700;
  font-size: 32px;
  text-align: center;
  color: #0A142F;
  margin-top: 32px;
  margin-bottom: 32px;
`;

export const MainText = styled.p`
  margin-top: 32px;
  margin-bottom: 32px;
  width: 100%;
  font-weight: 500;
  font-size: 16px;
  color: #0A142F;
  opacity: 0.8;
`;

export const ButtonContainer = styled.div`
  margin-top: 32px;
  margin-bottom: 32px;
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
    font-family: Noto Sans KR,serif;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 8px;
  }
`;