import axios from 'axios';
import {  KindeUserType } from '@/types/KindeUser';

const getStrapiUser = async (userId: string): Promise<KindeUserType | null> => {

  try {
    const response = await axios.get('http://localhost:1337/api/kindeusers', {
      params: {
        'filters[userId][$eq]': userId,
        'populate': '*'
      },
 
    });

    if (response.status === 200 && response.data.data.length > 0) {
      const userData = response.data.data[0]; // İlk kullanıcıyı al

      return userData;
    } else {
      throw new Error('Kullanıcı bilgileri alınamadı veya kullanıcı bulunamadı');
    }
  } catch (error) {
    console.error('Kullanıcı bilgileri alınamadı:', error);
    return null;
  }
};

export default getStrapiUser;
