import React, { useState } from "react";
import styled from "styled-components";

type BannerImageType = {
  source: string;
};

const SliderImage = styled.img`
  height: 17rem;
  width: 18%;
  right: 17rem;
  top: 1.5rem;
  position: absolute;
  border-radius: 1rem;
  object-fit: cover;
`;

const BannerImage = ({ source }: BannerImageType) => {
  return <SliderImage src={source}></SliderImage>;
};

export default BannerImage;
