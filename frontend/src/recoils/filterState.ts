import { atom } from "recoil";

interface Filter {
  solved?: boolean;
  level?: string;
  search?: string;
}

export const filterState = atom<Filter>({
  key: "filterState",
  default: {},
});
