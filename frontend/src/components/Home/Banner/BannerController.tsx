import React, { useEffect, useState } from 'react';
import { SliderLeft, SliderRight } from '../../../assets/icons';
import styled, { css } from 'styled-components';

type BannerControllerType = {
  pageNum: number;
  onClickButton: (num: number) => void;
};

type WrapperProp = {
  left: number;
};
const ControllerWrapper = styled.div<WrapperProp>`
  position: absolute;
  bottom: 0.5rem;
  ${(props) =>
    props.left &&
    css`
      left: ${props.left}px;
    `}
  display: flex;
  line-height: 1rem;
`;

const SliderController = styled.img`
  height: 1.3rem;
  width: 0.8rem;
  cursor: pointer;
`;

const SliderPage = styled.div`
  height: 1.8rem;
  width: 7rem;
  text-align: center;
  //color: #0b6113;
  color: black;
  font-weight: 500;
  font-size: 1.2rem;
`;

const BannerController = ({ pageNum, onClickButton }: BannerControllerType) => {
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const [left, setLeft] = useState(23 * rem);
  const handleResize = () => {
    const windowLen = Math.max(80 * rem, window.innerWidth);
    const len = (windowLen - 80 * rem) / 2;
    setLeft(len + 2 * rem);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleLeftClick = () => {
    if (pageNum == 0) onClickButton(2);
    else onClickButton(pageNum - 1);
  };
  const handleRightClick = () => {
    if (pageNum == 2) onClickButton(0);
    else onClickButton(pageNum + 1);
  };
  return (
    <ControllerWrapper left={left}>
      <SliderController
        src={SliderLeft}
        onClick={handleLeftClick}
        alt={'좌측 화살표'}
      ></SliderController>
      <SliderPage>0{pageNum + 1} | 03</SliderPage>
      <SliderController
        src={SliderRight}
        onClick={handleRightClick}
        alt={'우측 화살표'}
      ></SliderController>
    </ControllerWrapper>
  );
};

export default BannerController;
