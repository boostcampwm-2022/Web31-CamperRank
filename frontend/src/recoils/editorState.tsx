import { atom } from 'recoil';

interface Editor {
  text: string;
  language: string;
}

export const editorState = atom<Editor>({
  key: 'editorState',
  default: {
    text: '',
    language: 'Javascript',
  },
});
