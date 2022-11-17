import React, { useState } from "react";
import styled from "styled-components";

type BannerTextType = {
  text: string;
};

const TextWrapper = styled.div`
  height: 160px;
  width: 444px;
  left: 336px;
  top: 120px;
  position: absolute;
  font-weight: 400;
  font-size: 48px;
  text-align: center;
  white-space: pre-wrap;
  line-height: 72px;
`;

const BannerText = ({ text }: BannerTextType) => {
  return <TextWrapper>{text}</TextWrapper>;
};

export default BannerText;
