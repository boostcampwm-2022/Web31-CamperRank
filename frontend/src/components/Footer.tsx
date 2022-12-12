import {
  ButtonContainer,
  FooterContainer,
  KeyPhrase,
  MainText,
} from '../styles/Footer.style';

export const Footer = () => {
  return (
    <FooterContainer>
      <KeyPhrase>Concurrent. Chat. Enjoy.</KeyPhrase>
      <MainText>
        We want you to enjoy algorithmic problem solving.
        <br />
        Try to solve a problem with your friend.
      </MainText>
      <ButtonContainer>
        <a href={'https://github.com/boostcampwm-2022/Web31-CamperRank/wiki'}>
          👀 Team
        </a>
      </ButtonContainer>
    </FooterContainer>
  );
};
