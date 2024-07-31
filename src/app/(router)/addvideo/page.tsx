"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Separator } from "@/components/ui/separator";
import AddVideo from "../_components/Tube/AddVideo";
import { useRecoilState, useRecoilValue } from "recoil";
import { updateVideoAtom } from "@/atoms/updateVideoAtom";
import { createVideoAction, deleteVideoUrl } from "@/actions/actionVideo";
import { redirect } from "next/navigation";
import { userAtom } from "@/atoms/userAtom";

const AddVideoPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [removeloading, setRemoveLoading] = useState(false);
  const [createloading, setCreateLoading] = useState(false);
  const [uploadVideo, setUploadVideo] = useRecoilState(updateVideoAtom);
  const user = useRecoilValue(userAtom);

  if (!user) {
    redirect("/api/auth/login");
  }
  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleAddVideo = async () => {
    try {
      setCreateLoading(true);
      if (uploadVideo && uploadVideo.title && uploadVideo.url) {
        const videoData = {
          title: uploadVideo.title,
          description: uploadVideo.description,
          url: uploadVideo.url,
          thumbnail: uploadVideo.thumbnail,
        };

        await createVideoAction(videoData);
        console.log("Video uploaded successfully!");
        setIsOpen(false);
        setUploadVideo(null);
      } else {
        console.error("Title and URL are required");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleDeleteVideoImageURL = async () => {
    try {
      setRemoveLoading(true);
      if (uploadVideo) {
        const mediaIds = [];

        if (uploadVideo.url) {
          const videoId = uploadVideo.videoId;
          if (videoId) mediaIds.push(videoId);
        }

        if (uploadVideo.thumbnail) {
          const imageId = uploadVideo.thumbnailId;
          if (imageId) mediaIds.push(imageId);
        }
        console.log("Media", mediaIds);
        for (const id of mediaIds) {
          await deleteVideoUrl(id);
        }

        setUploadVideo(null);
        console.log("Video and image deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting video or image:", error);
    } finally {
      setRemoveLoading(false);
    }
  };

  return (
    <>
    {uploadVideo ? (
      <div className="flex items-center justify-between py-4 my-4 border-y-2">
      <div className="relative w-64 h-36 overflow-hidden"> {/* Sabit boyutlar burada */}
        <video className="absolute inset-0 object-cover w-full h-full" controls>
          <source src={uploadVideo?.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Taslağı düzenle</Button>
        </DialogTrigger>
        <DialogContent className="max-w-screen-xl h-4/5 rounded-full flex flex-col">
          <DialogHeader>
            <DialogTitle className="ml-8 text-2xl">Video Yükleyin</DialogTitle>
            <DialogDescription />
            <Separator className="mt-4" />
          </DialogHeader>
          <div className="py-4 flex-1 ">
            <AddVideo />
          </div>
          {uploadVideo ? (
            <div className="flex justify-end">
              <Button
                size="lg"
                onClick={handleDeleteVideoImageURL}
                disabled={removeloading}
              >
                {removeloading ? "Yükleniyor..." : "Video'yu sil"}
              </Button>
              <Button
                size="lg"
                onClick={handleAddVideo}
                disabled={createloading}
              >
                {createloading ? "Yükleniyor..." : "Video Ekle"}
              </Button>
            </div>
          ) : (
            <DialogFooter>
              <span className="text-sm">
                Videolarınızı Sayfamıza yükleyerek, Hizmet şartlarını kabul
                etmiş olursunuz. Lütfen başkalarının telif veya gizlilik
                haklarını ihlal etmediğinizden emin olun.
              </span>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
    ):
    (<div className="flex items-center justify-center h-full mx-auto border ">
       <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Video Ekle</Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-xl h-4/5 rounded-full flex flex-col">
        <DialogHeader>
          <DialogTitle className="ml-8 text-2xl">Video Yükleyin</DialogTitle>
          <DialogDescription />
          <Separator className="mt-4" />
        </DialogHeader>
        <div className="py-4 flex-1 ">
          <AddVideo />
        </div>
        {uploadVideo ? (
          <div className="flex justify-end">
            <Button
              size="lg"
              onClick={handleDeleteVideoImageURL}
              disabled={removeloading}
            >
              {removeloading ? "Yükleniyor..." : "Video'yu sil"}
            </Button>
            <Button
              size="lg"
              onClick={handleAddVideo}
              disabled={createloading}
            >
              {createloading ? "Yükleniyor..." : "Video Ekle"}
            </Button>
          </div>
        ) : (
          <DialogFooter>
            <span className="text-sm">
              Videolarınızı Sayfamıza yükleyerek, Hizmet şartlarını kabul
              etmiş olursunuz. Lütfen başkalarının telif veya gizlilik
              haklarını ihlal etmediğinizden emin olun.
            </span>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
    </div> 
   )}
    
    </>
   
  );
};

export default AddVideoPage;
