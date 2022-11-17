import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Delete, RedDelete } from "../../../assets/icons";
import { useRecoilState } from "recoil";
import { filterState } from "../../../recoils";

const SearchWrapper = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 64px;
  margin-right: 64px;
`;

const Title = styled.div`
  color: #888;
  font-size: 24px;
  font-weight: bold;
  margin-right: 36px;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
`;

const Search = styled.div`
  width: 176px;
  height: 50px;
  border: 3px solid #b5d4a8;
  border-radius: 8px;
  background: #fff;
  font-size: 24px;
  text-align: center;
  line-height: 50px;
  margin-left: 32px;
`;

const DeleteIcon = styled.img`
  width: 24px;
  height: 24px;
  filter: invert(0.3);
  cursor: pointer;
`;

const SearchBox = () => {
  const [filter, setFilter] = useRecoilState(filterState);
  const clickEvent = {
    solved: () => setFilter({ ...filter, solved: "푼 상태" }),
    level: () => setFilter({ ...filter, level: "문제 레벨" }),
    search: () => setFilter({ ...filter, search: "" }),
  };
  const handleImgClick = (kind: string) => {
    if (kind == "solved" || kind == "level" || kind == "search")
      clickEvent[kind]();
  };
  return (
    <SearchWrapper>
      <Title>SEARCH STATUS</Title>
      {Object.entries(filter).map((elem, idx) => {
        const [kind, value] = elem;
        if (
          (kind === "solved" && value === "푼 상태") ||
          (kind === "level" && value === "문제 레벨") ||
          value === ""
        )
          return;
        return (
          <Box key={idx}>
            <DeleteIcon src={RedDelete} onClick={() => handleImgClick(kind)} />
            <Search>{value}</Search>
          </Box>
        );
      })}
    </SearchWrapper>
  );
};

export default SearchBox;
