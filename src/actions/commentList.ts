import axios from "axios";
const STRAPI_API_URLBASE = process.env.NEXT_PUBLIC_STRAPI_API_URLBASE;

const commentList = async (userId:string) => {
    try {
      const response = await axios.get(`${STRAPI_API_URLBASE}/api/videos`, {
        params: {
          'filters[comments][userId][$eq]': userId, 
          'populate': '*'
        }
      });
  
      return response.data;
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  };
  export default commentList;