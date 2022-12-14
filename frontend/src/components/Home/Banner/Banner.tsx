import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  const [throttle, setThrottle] = useState(false);

  useEffect(() => {
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    if (width < 80 * rem) setWidth(80 * rem);
  }, [width]);

  const handleResize = () => {
    if (throttle) return;
    setThrottle(true);
    setTimeout(() => {
      setWidth(window.innerWidth);
      setThrottle(false);
    }, 400);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

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
