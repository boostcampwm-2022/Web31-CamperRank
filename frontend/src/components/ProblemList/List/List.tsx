import React, { useState } from "react";
import styled from "styled-components";
import Problem from "./Problem";

const ListWrapper = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  padding: 48px;
  gap: 48px;
`;

const List = () => {
  return (
    <ListWrapper>
      <Problem />
      <Problem />
    </ListWrapper>
  );
};

export default List;
