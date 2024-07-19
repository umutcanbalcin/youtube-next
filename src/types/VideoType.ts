import { KindeUser } from "./KindeUser";
import { VideoClickType } from "./VideoClickType";

export type VideoAttributes= {
    title: string;
    description: string;
    url: string;
    thumbnail: string | null;
    userId: KindeUser;
    videoclicks:VideoClickType;  
    createdAt: string;
    publishedAt: Date;
    updatedAt: Date;
  }
  
 export type  VideoType= {
      id: string;
      attributes: VideoAttributes;
  }