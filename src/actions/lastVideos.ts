import axios from "axios";
const STRAPI_API_URLBASE = process.env.NEXT_PUBLIC_STRAPI_API_URLBASE;

const lastVideos = async (userId: string) => {
  try {
    const response = await axios.get(`${STRAPI_API_URLBASE}/api/videoclicks`, {
      params: {
        'filters[userId][$eq]': userId,
        'sort': 'createdAt:desc',
        'populate': {
          'videoId': {
            'populate': '*' 
          }
        }
      }
    });

    // Videoclicks verilerini al
    const videoClicks = response.data.data;

    // VideoClick nesnelerinin her birindeki videoId.data objesini döndür
    const videos = videoClicks.map((click: any) => click.attributes.videoId.data);

    return videos;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

export default lastVideos;
