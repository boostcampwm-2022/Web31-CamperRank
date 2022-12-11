import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import BannerContent from './BannerContent';
import BannerController from './BannerController';
import BannerInfo from '../../../utils/BannerInfo';

type BannerType = {
  page: number;
  width: number;
};

const BannerContainer = styled.div<BannerType>`
  height: 100%;
  display: flex;
  ${(props) =>
    css`
      width: ${props.width * 3}px;
      transform: translate(${props.page * -props.width}px, 0);
      transition: all 0.4s ease-in-out;
    `}
`;

const Banner = () => {
  const [page, setPage] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    if (width < 80 * rem) setWidth(80 * rem);
  }, [width]);
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleButtonClick = (num: number) => setPage(num);

  useEffect(() => {
    const pageChange = setInterval(() => setPage((page + 1) % 3), 4000);
    return () => clearInterval(pageChange);
  });

  return (
    <>
      <BannerContainer page={page} width={width}>
        {BannerInfo.map((content, idx) => (
          <BannerContent key={idx} content={content} />
        ))}
      </BannerContainer>
      <BannerController pageNum={page} onClickButton={handleButtonClick} />
    </>
  );
};

export default Banner;
