import React, { useState } from "react";
import styled from "styled-components";

type BannerTextType = {
  text: string;
};

const TextWrapper = styled.div`
  height: 6rem;
  width: 30%;
  left: 18rem;
  top: 5rem;
  position: absolute;
  font-weight: 400;
  font-size: 2.8rem;
  text-align: center;
  white-space: pre-wrap;
  line-height: 4.5rem;
`;

const BannerText = ({ text }: BannerTextType) => {
  return <TextWrapper>{text}</TextWrapper>;
};

export default BannerText;
