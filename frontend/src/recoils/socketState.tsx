import { atom } from 'recoil';
import { Socket } from 'socket.io-client';

export const socketState = atom<Socket | undefined>({
  key: 'socketState',
  default: undefined,
  dangerouslyAllowMutability: true,
});
