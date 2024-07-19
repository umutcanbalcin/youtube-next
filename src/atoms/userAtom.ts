import {  KindeUserType } from '@/types/KindeUser';
import { atom } from 'recoil';


export const userAtom = atom<KindeUserType | null>({
  key: 'userAtom',
  default: null,
});
