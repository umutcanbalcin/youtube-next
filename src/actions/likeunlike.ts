'use server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import axios from 'axios';
const STRAPI_API_URLBASE = process.env.NEXT_PUBLIC_STRAPI_API_URLBASE;


interface LikeUnlikeData {
  commentId?: string;
  videoId?: string;
  userId: string;
  type: 'like' | 'unlike';
}

export const createLikeUnlike = async (data: LikeUnlikeData) => {
  const {  getAccessToken } = getKindeServerSession();

  const token = await getAccessToken();
  
  try {
    const response = await axios.post(`${STRAPI_API_URLBASE}/api/likes`, {
      data
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating like/unlike:', error);
    throw error;
  }
};

export const deleteLikeUnlike = async (id: string) => {
  const {  getAccessToken } = getKindeServerSession();

  const token = await getAccessToken();
  try {
    const response = await axios.delete(`${STRAPI_API_URLBASE}/api/likes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting like/unlike:', error);
    throw error;
  }
};

export const fetchLikesUnlikes = async (videoId: string) => {
  try {
    const response = await axios.get(`${STRAPI_API_URLBASE}/api/likes`, {
      params: { 
        'filters[videoId][$eq]': videoId, 
        'populate': '*' },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching likes/unlikes:', error);
    throw error;
  }
};

export const fetchCommentLikesUnlikes = async (commentId: string) => {
  try {
    const response = await axios.get(`${STRAPI_API_URLBASE}/api/likes`, {
      params: { 
        'filters[commentId][$eq]': commentId, 
        'populate': '*' },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching comment likes/unlikes:', error);
    throw error;
  }
};
