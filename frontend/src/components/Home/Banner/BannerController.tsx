import React, { useState } from "react";
import { SliderLeft, SliderRight } from "../../../assets/icons";
import styled from "styled-components";

type BannerControllerType = {
  pageNum: number;
  onClickButton: (num: number) => void;
};

const ControllerWrapper = styled.div`
  position: absolute;
  top: 320px;
  left: 96px;
  display: flex;
`;

const SliderController = styled.img`
  height: 29px;
  width: 13px;
  cursor: pointer;
`;

const SliderPage = styled.div`
  height: 25px;
  width: 72px;
  text-align: center;
  color: #0b6113;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  padding: 0 28px;
`;

const BannerController = ({ pageNum, onClickButton }: BannerControllerType) => {
  const handleLeftClick = () => {
    if (pageNum == 0) onClickButton(2);
    else onClickButton(pageNum - 1);
  };
  const handleRightClick = () => {
    if (pageNum == 2) onClickButton(0);
    else onClickButton(pageNum + 1);
  };
  return (
    <ControllerWrapper>
      <SliderController
        src={SliderLeft}
        onClick={handleLeftClick}
      ></SliderController>
      <SliderPage>0{pageNum + 1} | 03</SliderPage>
      <SliderController
        src={SliderRight}
        onClick={handleRightClick}
      ></SliderController>
    </ControllerWrapper>
  );
};

export default BannerController;
