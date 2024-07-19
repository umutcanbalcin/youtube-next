import { KindeUser } from "./KindeUser"

export type LikeUnlikeType= {
  id: string,
  attributes: {
      userId?:KindeUser;
      createdAt: Date,
      updatedAt: Date,
      publishedAt: Date,
      type: "like"|"unlike",

  }
  }