import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Problem from "./Problem";
import PageController from "./PageController";
import { ProblemInfo } from "@types";
import SearchBox from "./SearchBox";

type ListType = {
  list: ProblemInfo[];
};

const ListWrapper = styled.div`
  width: 75%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 4rem;
  gap: 2.5rem;
  height: 100%;
  position: relative;
`;

const SubWrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const List = ({ list }: ListType) => {
  const [page, setPage] = useState({ now: 1, max: Math.ceil(list.length / 7) });
  const [pagedList, setPagedList] = useState(list);

  useEffect(() => {
    const { now } = page;
    now && setPagedList([...list.slice(7 * (now - 1), 7 * now)]);
  }, [page]);

  useEffect(() => {
    setPage({
      now: 1,
      max: Math.ceil(list.length / 7),
    });
  }, [list]);

  return (
    <>
      <ListWrapper>
        {pagedList.length <= 7 &&
          pagedList.map((elem, idx) => <Problem key={idx} problem={elem} />)}
        <PageController
          page={page}
          onClickPage={(now: number) => setPage({ ...page, now })}
        ></PageController>
      </ListWrapper>
      <SubWrapper>
        <SearchBox></SearchBox>
      </SubWrapper>
    </>
  );
};

export default List;
