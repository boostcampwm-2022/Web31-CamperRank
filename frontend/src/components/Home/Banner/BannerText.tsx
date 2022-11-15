import React, { useState } from "react";
import styled from "styled-components";

type BannerTextType = {
  text: string;
};

const TextWrapper = styled.div`
  box-sizing: border-box;
  height: 151px;
  width: 444px;
  left: 317px;
  top: 125px;
  position: absolute;
  font-weight: 400;
  font-size: 40px;
  text-align: center;
  white-space: pre-wrap;
`;

const BannerText = ({ text }: BannerTextType) => {
  return <TextWrapper>{text}</TextWrapper>;
};

export default BannerText;
