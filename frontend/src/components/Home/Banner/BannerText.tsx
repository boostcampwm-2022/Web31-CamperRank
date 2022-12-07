import React, { useState } from 'react';
import styled from 'styled-components';

type BannerTextType = {
  text: string;
};

const TextWrapper = styled.div`
  width: 30rem;
  left: 18%;
  top: 5rem;
  height: fit-content;
  position: absolute;
  font-weight: 400;
  font-size: 3rem;
  text-align: center;
  white-space: pre-wrap;
  line-height: 4.5rem;
`;

const BannerText = ({ text }: BannerTextType) => {
  return <TextWrapper>{text}</TextWrapper>;
};

export default BannerText;
