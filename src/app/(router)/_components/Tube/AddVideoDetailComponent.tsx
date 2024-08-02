import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { useRecoilState } from 'recoil';
import { updateVideoAtom } from '@/atoms/updateVideoAtom';

const AddVideoDetailComponent: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [updateVideo, setUpdateVideo] = useRecoilState(updateVideoAtom);

  const [imageLoading, setImageLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);

  const handleCardClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('files', file);

      try {
        setImageLoading(true);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URLBASE}/api/upload`,
          formData
        );

        if (response.data && response.data.length > 0) {
          const uploadedImage = response.data[0];
          setUpdateVideo((prev) => ({
            ...prev!,
            thumbnail: `${process.env.NEXT_PUBLIC_STRAPI_API_URLBASE}/${uploadedImage.url}`,
            thumbnailId: uploadedImage.id
          }));
        }

        console.log('File uploaded successfully:', response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setImageLoading(false);
      }
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateVideo((prev) => ({
      ...prev!,
      title: event.target.value,
    }));
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateVideo((prev) => ({
      ...prev!,
      description: event.target.value,
    }));
  };

  return (
    <div>
      <h1 className="text-2xl my-5 px-4 font-bold">Ayrıntılar</h1>
      <div className="flex flex-col lg:flex-row items-start">
        <div className="lg:basis-3/5 px-4">
          <div className="relative my-5">
            <Label className="absolute top-4 left-3 bg-white px-1 text-gray-500 transform -translate-y-1/2 text-xl">
              Başlık (zorunlu)
            </Label>
            <Textarea
              placeholder="Videonuzun içeriği için bir başlık oluşturun"
              className="mt-4 pt-10"
              rows={4}
              value={updateVideo?.title || ''}
              onChange={handleTitleChange}
            />
          </div>
          <div className="relative my-5">
            <Label className="absolute top-4 left-3 bg-white px-1 text-gray-500 transform -translate-y-1/2 text-xl">
              Açıklama
            </Label>
            <Textarea
              placeholder="İzleyicilerinize videonuzu anlatın"
              className="mt-4 pt-10"
              rows={4}
              value={updateVideo?.description || ''}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="flex flex-col my-5">
            <h1 className="text-lg">Küçük Resim</h1>
            <p className="text-sm">
              Göze çarpacak ve izleyicilerin dikkatini çekecek bir küçük resim
              seçin.
            </p>
            <div
              className="border-dashed border-2 border-gray-400 w-full lg:w-1/3 h-40 flex items-center justify-center cursor-pointer relative"
              onClick={handleCardClick}
            >
              {updateVideo?.thumbnail ? (
                <Image
                  src={updateVideo.thumbnail}
                  alt="Uploaded"
                  fill
                  sizes="(max-width: 600px) 100vw, 50vw"
                  priority
                  style={{ objectFit: 'cover' }}
                  className="absolute"
                />
              ) : (
                <UploadCloud className="text-gray-400" size={48} />
              )}
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
            {imageLoading && <p>Resim yükleniyor...</p>}
          </div>
        </div>
        <div className="lg:basis-2/5 flex justify-center">
          <div className="relative w-full pb-[56.25%] overflow-hidden my-5">
            <video
              className="absolute top-0 left-0 w-full h-full object-contain"
              controls
            >
              <source src={updateVideo?.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {videoLoading && <p>Video yükleniyor...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVideoDetailComponent;
