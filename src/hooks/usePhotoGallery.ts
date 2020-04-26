import { useState } from "react";
import { useCamera } from "@ionic/react-hooks/camera";
import { useFilesystem, base64FromPath } from "@ionic/react-hooks/filesystem";
import {
  CameraResultType,
  CameraSource,
  CameraPhoto,
  FilesystemDirectory,
} from "@capacitor/core";

export function usePhotoGallery() {
  const { getPhoto } = useCamera();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photos1, setPhotos1] = useState<Photo[]>([]);
  const [photos2, setPhotos2] = useState<Photo[]>([]);
  const {  writeFile } = useFilesystem();
  const savePicture = async (photo: CameraPhoto, fileName: string) => {
    const base64Data = await base64FromPath(photo.webPath!);
    const savedFile = await writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data,
    });

    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: photo.webPath,
    };
  };
  const takePhoto = async () => {
    const cameraPhoto = await getPhoto({
      resultType: CameraResultType.Uri,
      quality: 100,
      source:CameraSource.Prompt
    });
    const fileName = new Date().getTime() + ".jpeg";
    const savedFileImage = await savePicture(cameraPhoto, fileName);
    const newPhotos = [savedFileImage];
    setPhotos(newPhotos);
  };
  const takePhoto1 = async () => {
    const cameraPhoto1 = await getPhoto({
      resultType: CameraResultType.Uri,
      quality: 100,
    });
    const fileName = new Date().getTime() + ".jpeg";
    const savedFileImage = await savePicture(cameraPhoto1, fileName);
    const newPhotos1 = [savedFileImage];
    setPhotos1(newPhotos1);
  };
  
  const takePhoto2 = async () => {
    const cameraPhoto2 = await getPhoto({
      resultType: CameraResultType.Uri,
      quality: 100,
    });
    const fileName = new Date().getTime() + ".jpeg";
    const savedFileImage = await savePicture(cameraPhoto2, fileName);
    const newPhotos2 = [savedFileImage];
    setPhotos2(newPhotos2);
  
  };

  return {
    photos,
    takePhoto,
    photos1,
    takePhoto1,
    photos2,
    takePhoto2,
  };

}
export interface Photo {
  filepath: string;
  webviewPath?: string;
  base64?: string;
}
