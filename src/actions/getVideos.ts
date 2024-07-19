'use server'
import { VideoType } from '@/types/VideoType';
import axios from 'axios';
const STRAPI_API_URLBASE = process.env.NEXT_PUBLIC_STRAPI_API_URLBASE;

interface VideoResponse {
  data: VideoType[];
}

export const getVideos = async (): Promise<VideoType[]> => {

  try {
    const response = await axios.get<VideoResponse>(`${STRAPI_API_URLBASE}/api/videos?populate=*`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};
