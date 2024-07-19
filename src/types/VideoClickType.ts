import { KindeUser } from "./KindeUser"

export type VideoClickType= {
    data:{
        id:string,
        length:number,
        attributes:{
        cookieId?:string,
        userId?:KindeUser
        createdAt:Date,
        publishedAt:Date
        updatedAt:Date;
    }
}
}