import axios from 'axios';
import { VideoType } from '@/types/VideoType';
const STRAPI_API_URLBASE = process.env.NEXT_PUBLIC_STRAPI_API_URLBASE;
export const getVideoById = async (id: string): Promise<VideoType | null> => {
  try {
    const response = await axios.get(`${STRAPI_API_URLBASE}/api/videos/${id}?populate=*`);
    return response.data.data;
  } catch (error) {
    console.error("Video data fetch error:", error);
    return null;
  }
};
