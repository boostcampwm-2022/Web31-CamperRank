import React, { useState } from 'react';
import styled from 'styled-components';

type BannerImageType = {
  source: string;
};

const SliderImage = styled.img`
  height: 13rem;
  width: 16%;
  right: 25%;
  top: 1.2rem;
  position: absolute;
  border-radius: 1rem;
  object-fit: cover;
`;

const BannerImage = ({ source }: BannerImageType) => {
  return <SliderImage src={source}></SliderImage>;
};

export default BannerImage;
