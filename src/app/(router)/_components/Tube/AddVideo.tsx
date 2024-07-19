import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import AddVideoDetailComponent from './AddVideoDetailComponent';
import { useRecoilState } from 'recoil';
import { updateVideoAtom } from '@/atoms/updateVideoAtom';
import { MdFileUpload } from 'react-icons/md';
import { Loader } from 'lucide-react'; // Import loading icon

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
const STRAPI_API_URLBASE = process.env.NEXT_PUBLIC_STRAPI_API_URLBASE;

const AddVideo: React.FC = () => {
  const [updateVideo, setUpdateVideo] = useRecoilState(updateVideoAtom);
  const inputRef = useRef<HTMLInputElement>(null);
  const { accessToken } = useKindeBrowserClient();
  const [loading, setLoading] = useState(false);

  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);

      const file = event.target.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append('files', file);

        const response = await axios.post(`${STRAPI_API_URLBASE}/api/upload/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          }
        });

        if (response.data.length > 0) {
          const uploadedFile = response.data[0];
          setUpdateVideo(prev => ({
            ...prev!,
            url: `${STRAPI_API_URLBASE}${uploadedFile.url}`,
            videoId: uploadedFile.id
          }));
        }
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      {updateVideo?.url ? (
        <AddVideoDetailComponent />
      ) : (
        <div className="flex flex-col h-full justify-center gap-4 items-center mx-auto">
          <Avatar className="w-40 h-40 bg-gray-200 flex items-center justify-center">
            {loading ? <Loader className="w-1/2 h-1/2 text-gray-500 animate-spin" /> : <MdFileUpload className="w-1/2 h-1/2 text-gray-500" />}
          </Avatar>
          <div className="flex flex-col mx-auto justify-center items-center">
            <p>Video dosyalarını yüklemek için sürükleyin ve bırakın</p>
            <span className="text-sm">
              Videolarınız, siz yayınlayana kadar gizli olarak kalır.
            </span>
          </div>
          <Button onClick={handleButtonClick} className="flex items-center mb-4 rounded-2xl" disabled={loading}>
            {loading ? 'Yükleniyor...' : 'Dosya seç'}
            <input
              ref={inputRef}
              id="videoInput"
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              disabled={loading}
              className="hidden"
            />
          </Button>
        </div>
      )}
    </>
  );
};

export default AddVideo;
