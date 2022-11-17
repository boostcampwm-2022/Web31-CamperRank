import React, { useState } from "react";
import styled from "styled-components";

type BannerImageType = {
  source: string;
};

const SliderImage = styled.img`
  height: 350px;
  width: 508px;
  right: 282px;
  top: 24px;
  position: absolute;
  border-radius: 15px;
  object-fit: cover;
`;

const BannerImage = ({ source }: BannerImageType) => {
  return <SliderImage src={source}></SliderImage>;
};

export default BannerImage;
