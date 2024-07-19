import { VideoClickType } from "./VideoClickType"

// types/strapi-user.ts
export type KindeUser= {
    data:{
        id:string,
        attributes:{
        userId:string,
        name:string,
        email:string,
        profilePicture:string
        createdAt:Date,
        publishedAt:Date
        updatedAt:Date;
    }
}

}
export type KindeUserType= {
  
        id:string,
        attributes:{
        userId:string,
        name:string,
        email:string,
        profilePicture:string,
        videoclicks:VideoClickType[];
        createdAt:Date,
        publishedAt:Date
        updatedAt:Date;

}

}