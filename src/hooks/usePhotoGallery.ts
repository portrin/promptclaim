import { useState, useEffect } from "react";
import { useCamera } from "@ionic/react-hooks/camera";
import { useFilesystem, base64FromPath } from "@ionic/react-hooks/filesystem";
import { useStorage } from "@ionic/react-hooks/storage";
import { isPlatform } from "@ionic/react";
import {
  CameraResultType,
  CameraSource,
  CameraPhoto,
  Capacitor,
  FilesystemDirectory,
  Camera,
} from "@capacitor/core";

export function usePhotoGallery() {
  const { getPhoto } = useCamera();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photos1, setPhotos1] = useState<Photo[]>([]);
  const [photos2, setPhotos2] = useState<Photo[]>([]);


  const takePhoto = async () => {
    const cameraPhoto = await getPhoto({
      resultType: CameraResultType.Uri,
      quality: 100,
      source:CameraSource.Prompt
    });
    const fileName = new Date().getTime() + ".jpeg";
    const newPhotos = [
      {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath,
      }
    ];
    setPhotos(newPhotos);
  
    
  };
  const takePhoto1 = async () => {
    const cameraPhoto1 = await getPhoto({
      resultType: CameraResultType.Uri,
      quality: 100,
    });
    const fileName = new Date().getTime() + ".jpeg";
    const newPhotos1 = [
      {
        filepath: fileName,
        webviewPath: cameraPhoto1.webPath,
      }
    ];
    setPhotos1(newPhotos1);
  
    
  };
  const takePhoto2 = async () => {
    const cameraPhoto2 = await getPhoto({
      resultType: CameraResultType.Uri,
      quality: 100,
    });
    const fileName = new Date().getTime() + ".jpeg";
    const newPhotos2 = [
      {
        filepath: fileName,
        webviewPath: cameraPhoto2.webPath,
      }
    ];
    setPhotos2(newPhotos2);
  
    
  };

  return {
    photos,
    takePhoto,
    photos1,
    takePhoto1,
    photos2,
    takePhoto2
  };
}
export interface Photo {
  filepath: string;
  webviewPath?: string;
  base64?: string;
}
