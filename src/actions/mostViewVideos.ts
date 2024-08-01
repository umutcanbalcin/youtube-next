// fetchMostViewed.ts
import axios from "axios";
const STRAPI_API_URLBASE = process.env.NEXT_PUBLIC_STRAPI_API_URLBASE;

const fetchMostViewed = async () => {
  try {
    const response = await axios.get(`${STRAPI_API_URLBASE}/api/videos`, {
      params: {
        '_sort': 'videoclicks.length:desc',
        'populate': '*'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching most viewed videos:', error);
    throw error;
  }
};

export default fetchMostViewed;
