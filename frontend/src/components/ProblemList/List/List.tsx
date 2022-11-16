import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Problem from "./Problem";
import PageController from "./PageController";
import { ProblemInfo } from "@types";

type ListType = {
  list: ProblemInfo[];
};

const ListWrapper = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 64px;
  gap: 40px;
  height: 100%;
  position: relative;
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
    <ListWrapper>
      {pagedList.length <= 7 &&
        pagedList.map((elem, idx) => <Problem key={idx} problem={elem} />)}
      <PageController
        page={page}
        onClickPage={(now: number) => setPage({ ...page, now })}
      ></PageController>
    </ListWrapper>
  );
};

export default List;
