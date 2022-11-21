import React from "react";
import { render, screen } from "@testing-library/react";
import SearchFilter from "./SearchFilter";
import { useRecoilState } from "recoil";
import { filterState } from "../../../recoils";

describe("problem level check", () => {
  const [filter] = useRecoilState(filterState);
  const { level } = filter;
  console.log(level);
});

export {};
