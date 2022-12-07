import BannerText from './BannerText';
import BannerImage from './BannerImage';
import styled, { css } from 'styled-components';
import { BannerType } from '@types';

type BannerWrapperProp = {
  color: string;
};

const BannerWrapper = styled.div<BannerWrapperProp>`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  min-width: 80rem;
  ${(props) =>
    css`
      background-color: ${props.color};
    `}
`;

const BannerContent = ({ content }: BannerType) => {
  return (
    <>
      <BannerWrapper color={content.color}>
        <BannerText text={content.text}></BannerText>
        <BannerImage source={content.image}></BannerImage>
      </BannerWrapper>
    </>
  );
};

export default BannerContent;
