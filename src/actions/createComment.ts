// actions/createComment.ts
'use server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import axios from 'axios';
import getStrapiUser from './getUser';

const STRAPI_API_URLBASE = process.env.NEXT_PUBLIC_STRAPI_API_URLBASE;

export const createCommentAction = async (newComment: string, id: string) => {
  const { getUser, getAccessToken } = getKindeServerSession();
  const user = await getUser();
  const token = await getAccessToken();
  if (!user) throw new Error("Unauthorized - you must be logged in to create comments");

  try {
    const userData = await getStrapiUser(user.id);
    const response = await axios.post(
      `${STRAPI_API_URLBASE}/api/comments`,
      {
        data: {
          content: newComment,
          userId: userData,
          videoId: id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200 && response.status !== 201) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }

    return response.data;
  } catch (error: any) {
    console.error('Error details:', error.response?.data || error.message);
    console.error('Full error response:', error.response);
    throw new Error('Yorum oluşturulamadı');
  }
};
