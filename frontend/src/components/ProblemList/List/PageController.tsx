import React, { useState } from "react";
import styled from "styled-components";
import { SliderLeft, SliderRight } from "../../../assets/icons";

type pageType = {
  now: number;
  max: number;
};

interface pageProps {
  onClickPage: (page: number) => void;
  page: pageType;
}

const ControllerWrapper = styled.div`
  position: absolute;
  bottom: 3rem;
  display: flex;
  gap: 1.5rem;
`;

const SliderImage = styled.img`
  height: 2rem;
  width: 1rem;
  border-radius: 15px;
  object-fit: cover;
  cursor: pointer;
`;

const PageWrapper = styled.div`
  display: flex;
  gap: 0.7rem;
`;

const Page = styled.div`
  font-size: 2rem;
  line-height: 2rem;
  font-weight: 400;
  color: gray;
  cursor: pointer;
`;

const NowPage = styled(Page)`
  font-weight: 700;
  color: green;
`;

const PageController = ({ page, onClickPage }: pageProps) => {
  const { now, max } = page;
  const handlePageClick = (page: number) => onClickPage(page);
  const handleLeftImageClick = () => {
    if (now > 1) onClickPage(now - 1);
  };
  const handleRightImageClick = () => {
    if (now < max) onClickPage(now + 1);
  };
  return (
    <ControllerWrapper>
      <SliderImage src={SliderLeft} onClick={handleLeftImageClick} />
      <PageWrapper>
        {Array.apply(null, new Array(max)).map((e, idx) =>
          idx + 1 == now ? (
            <NowPage key={idx} onClick={() => handlePageClick(idx + 1)}>
              {idx + 1}
            </NowPage>
          ) : (
            <Page key={idx} onClick={() => handlePageClick(idx + 1)}>
              {idx + 1}
            </Page>
          )
        )}
      </PageWrapper>
      <SliderImage src={SliderRight} onClick={handleRightImageClick} />
    </ControllerWrapper>
  );
};

export default PageController;
