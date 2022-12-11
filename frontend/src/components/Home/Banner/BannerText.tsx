import React, { useState } from 'react';
import styled from 'styled-components';

type BannerTextType = {
  text: string;
};

const TextWrapper = styled.div`
  width: 30rem;
  left: 15%;
  top: 2.5rem;
  height: fit-content;
  position: absolute;
  font-weight: 400;
  font-size: 2.4rem;
  text-align: center;
  white-space: pre-wrap;
  line-height: 4.5rem;
  color: #333333;
`;

const BannerText = ({ text }: BannerTextType) => {
  return <TextWrapper>{text}</TextWrapper>;
};

export default BannerText;
