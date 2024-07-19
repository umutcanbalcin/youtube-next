'use client'
import { useEffect } from 'react';
import axios from 'axios';

const useTemporaryIdentity = () => {
  useEffect(() => {
    const checkAndSetToken = async () => {
      // Tüm cookie'leri dizi olarak ayır
      const cookies = document.cookie.split('; ');
      // temporaryIdentity cookie'sini bulun
      const tokenCookie = cookies.find(row => row.startsWith('temporaryIdentity='));
      console.log('Current Token:', tokenCookie); // Token'ı kontrol et

      if (!tokenCookie) {
        try {
          // Token yoksa yeni bir token oluştur ve cookie'yi set et
          const response = await axios.post('/api/setcookie');
          const newToken = response.data.temporaryIdentity;
          console.log('Setting New Token:', newToken);

          document.cookie = `temporaryIdentity=${newToken}; Max-Age=${10 * 365 * 24 * 60 * 60}; Path=/; SameSite=Lax`;
        } catch (error) {
          console.error('Error setting token:', error);
        }
      }
    };

    checkAndSetToken();
  }, []);
};

export default useTemporaryIdentity;
