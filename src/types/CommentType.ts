// types/CommentsType.ts

import { KindeUser } from "./KindeUser";

export interface CommentsType {
  attributes:{
    id: string;
    userId: KindeUser;
    content: string;
  }
  id:string
  }
  