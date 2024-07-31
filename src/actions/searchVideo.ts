
import axios from "axios";
const STRAPI_API_URLBASE = process.env.NEXT_PUBLIC_STRAPI_API_URLBASE;

const searchVideos = async (searchTerm: string) => {
    try {
      const response = await axios.get(`${STRAPI_API_URLBASE}/api/videos`, {
        params: {
          'filters[$or][0][title][$containsi]': searchTerm, // case-insensitive search for title
          'filters[$or][1][description][$containsi]': searchTerm, // case-insensitive search for description
          'populate': '*'
        }
      });
  
      return response.data;
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  };
  export default searchVideos;