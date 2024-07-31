import { VideoType } from "@/types/VideoType";
import { atom } from "recoil";

export const searchVideoAtom = atom<VideoType[] | null>({
    key: 'searchVideoAtom',
    default: null,
  });
  