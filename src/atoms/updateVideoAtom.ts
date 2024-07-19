
import { atom } from 'recoil';
type VideoAtom={
  title?: string,
  videoId?:string
  description?: string,
  url?: string,
  thumbnail?: string,
  thumbnailId:string
}

export const updateVideoAtom = atom<VideoAtom | null>({
  key: 'updateVideoAtom',
  default: null,
});
