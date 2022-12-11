import BannerText from './BannerText';
import BannerImage from './BannerImage';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BannerType } from '@types';

type BannerWrapperProp = {
  color: string;
};

const BannerContainer = styled.div<BannerWrapperProp>`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  min-width: 80rem;
`;

const BannerWrapper = styled.div<BannerWrapperProp>`
  width: 80rem
  height: 100%;
  display: flex;
  margin: 0 auto;
  position: relative;
  min-width: 80rem;
  border-radius: 10px;
  cursor: pointer;
  ${(props) =>
    css`
      background-color: ${props.color};
    `}
`;

const BannerContent = ({ content }: BannerType) => {
  const navigate = useNavigate();
  return (
    <>
      <BannerContainer color={content.color}>
        <BannerWrapper
          color={content.color}
          onClick={() => navigate('/problems')}
        >
          <BannerText text={content.text}></BannerText>
          <BannerImage source={content.image}></BannerImage>
        </BannerWrapper>
      </BannerContainer>
    </>
  );
};

export default BannerContent;
