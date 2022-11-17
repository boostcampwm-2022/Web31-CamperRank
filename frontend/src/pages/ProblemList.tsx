import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { MainHeader } from "../components/MainHeader";
import { SearchFilter, List } from "../components/ProblemList";
import { Footer } from "../components/Footer";
import { filterState } from "../recoils";
import problems from "../utils/ProblemsDummy";

const MainWrapper = styled.div`
  width: 100%;
  height: 135rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-width: 1100px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 8rem;
`;

const ListWrapper = styled.div`
  width: 100%;
  height: 95rem;
  background: #f1f5ee;
  display: flex;
`;

const FooterWrapper = styled.div`
  width: 100%;
  height: 20rem;
`;

const ProblemList = () => {
  const [filter] = useRecoilState(filterState);
  const [list, setList] = useState(problems);
  useEffect(() => {
    const { solved, level, search } = filter;
    let filtered = [...problems];
    if (level !== "문제 레벨")
      filtered = filtered.filter((elem) => elem.level == level?.slice(-1));
    if (search !== "")
      filtered = filtered.filter((elem) => elem.title.includes(search));
    setList(filtered);
  }, [filter]);
  return (
    <MainWrapper>
      <HeaderWrapper>
        <MainHeader></MainHeader>
      </HeaderWrapper>
      <SearchFilter></SearchFilter>
      <ListWrapper>
        <List list={list}></List>
      </ListWrapper>
      <FooterWrapper>
        <Footer></Footer>
      </FooterWrapper>
    </MainWrapper>
  );
};

export default ProblemList;
