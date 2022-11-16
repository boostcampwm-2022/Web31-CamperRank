import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { MainHeader } from "../components/MainHeader";
import { SearchFilter, List } from "../components/ProblemList";
import { Footer } from "../components/Footer";
import { filterState } from "../recoils";

const MainWrapper = styled.div`
  width: 1920px;
  height: 2160px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 160px;
`;

const ListWrapper = styled.div`
  width: 100%;
  height: 1600px;
  background: #f1f5ee;
`;

const FooterWrapper = styled.div`
  width: 100%;
  height: 400px;
`;

const problem1 = {
  level: 1,
  title: "A + B = ?",
  description: "Lv1, Python, Javascript, Success Rate: 95.12%",
};

const problem2 = {
  level: 2,
  title: "A + B = ?",
  description: "Lv2, Python, Javascript, Success Rate: 95.12%",
};

const problem3 = {
  level: 3,
  title: "A + B = ?",
  description: "Lv3, Python, Javascript, Success Rate: 95.12%",
};

const problems = [
  ...new Array(10).fill(problem1),
  ...new Array(11).fill(problem2),
  ...new Array(12).fill(problem3),
];

const ProblemList = () => {
  const [filter, setFilter] = useRecoilState(filterState);
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
