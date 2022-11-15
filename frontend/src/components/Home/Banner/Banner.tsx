import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import BannerContent from "./BannerContent";
import BannerController from "./BannerController";
import BannerInfo from "../../../utils/BannerInfo";

type BannerType = {
  page: number;
};

const BannerContainer = styled.div<BannerType>`
  box-sizing: border-box;
  width: ${1920 * 3}px;
  height: 100%;
  display: flex;
  border: 2px solid blue;
  ${(props) =>
    css`
      transform: translate(${props.page * -1920}px, 0);
      transition: all 0.4s ease-in-out;
    `}
`;

const Banner = () => {
  const [page, setPage] = useState(0);
  const handleButtonClick = (num: number) => setPage(num);

  useEffect(() => {
    const pageChange = setInterval(() => setPage((page + 1) % 3), 4000);
    return () => clearInterval(pageChange);
  });

  return (
    <>
      <BannerContainer page={page}>
        {BannerInfo.map((content, idx) => (
          <BannerContent key={idx} content={content} />
        ))}
      </BannerContainer>
      <BannerController pageNum={page} onClickButton={handleButtonClick} />
    </>
  );
};

export default Banner;
