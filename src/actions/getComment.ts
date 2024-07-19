import axios from 'axios';
import { CommentsType } from '@/types/CommentType';
const STRAPI_API_URLBASE = process.env.NEXT_PUBLIC_STRAPI_API_URLBASE;
export const getComments = async (videoId: string): Promise<CommentsType[]> => {
  try {
    const response = await axios.get(`${STRAPI_API_URLBASE}/api/comments`, {
      params: {
        'filters[videoId][$eq]': videoId,
        'populate': '*'
      }
    });

    if (response.status === 200) {
      return response.data.data; // response.data doğrudan CommentsType[] türünde döndürüldü
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};
