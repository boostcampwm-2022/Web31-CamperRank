import { act, render, screen } from '@testing-library/react';
import { SearchFilter } from '../src/components/ProblemList';
import { RecoilRoot } from 'recoil';
import { unmountComponentAtNode } from 'react-dom';

let container: any = null;
beforeEach(() => {
  // 렌더링 대상으로 DOM 엘리먼트를 설정합니다.
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // 기존의 테스트 환경을 정리합니다.
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders with or without a name', () => {
  act(() => {
    render(
      <RecoilRoot>
        <SearchFilter />
      </RecoilRoot>,
      container,
    );
  });
  expect(container.textContent).toBe('');
});

export {};
