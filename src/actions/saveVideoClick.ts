'use server'
import axios from 'axios';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import getStrapiUser from './getUser';

const STRAPI_API_URLBASE = process.env.NEXT_PUBLIC_STRAPI_API_URLBASE;

const createVideoClick = async (videoId: string,cookieId:string) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  try {
    let userData = null;

    if (user) {
      userData = await getStrapiUser(user.id);
    }
    const response = await axios.get(`${STRAPI_API_URLBASE}/api/videoclicks`, {
      params: {
        filters: {
          videoId: videoId,
          ...(userData ? { userId: userData.id } : { cookieId: cookieId }),
        },
      },
    });

    const existingClicks = response.data.data;

    if (existingClicks.length === 0) {
      // If no previous clicks, create a new click record
      await axios.post(`${STRAPI_API_URLBASE}/api/videoclicks`, {
        data: {
          videoId: videoId,
          userId: userData ? userData.id : null,
          cookieId: userData ? null : cookieId,
        },
      });
    } else {
      console.log('User or cookie has already clicked this video.');
    }
  } catch (error) {
    console.error('Error recording video click:', error);
    // Handle error scenario
  }
};

export default createVideoClick;
