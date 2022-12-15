import { atom } from 'recoil';

interface Filter {
  solved?: string;
  level?: string;
  search?: string;
  check: boolean;
}

export const filterState = atom<Filter>({
  key: 'filterState',
  default: {
    solved: '푼 상태',
    level: '문제 레벨',
    search: '',
    check: false,
  },
});
