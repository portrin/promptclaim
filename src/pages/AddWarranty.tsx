import React, { useState } from "react";

import {
  IonSlides,
  IonSlide,
  IonDatetime,
  IonList,
  IonInput,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItemDivider,
  IonListHeader,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonImg,
  IonCard,
} from "@ionic/react";
import { image } from "ionicons/icons";
import "./AddWarranty.css";
import { usePhotoGallery } from "../hooks/usePhotoGallery";

const slideOpts = {
  initialSlide: 1,
  speed: 400,
};

const AddWarranty: React.FC = () => {
  const [text, setText] = useState<string>();
  const [text1, setText1] = useState<string>();
  const [text2, setText2] = useState<string>();
  const [text3, setText3] = useState<string>();
  const [text4, setText4] = useState<string>();
  const [text5, setText5] = useState<string>();
  const { photos, takePhoto } = usePhotoGallery();
  const { photos1, takePhoto1 } = usePhotoGallery();
  const { photos2, takePhoto2 } = usePhotoGallery();
  const today = new Date().toISOString()
  const [selectedDate, setSelectedDate] = useState<string>(
    today
  );

  
  console.log(JSON.stringify(photos[0]));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Add New Warranty</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>Product Information</IonListHeader>
          <IonItem>
            <IonInput
              value={text}
              placeholder="Product Name"
              onIonChange={(e) => setText(e.detail.value!)}
              clearInput
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              value={text1}
              placeholder="Serial Number"
              onIonChange={(e) => setText1(e.detail.value!)}
              clearInput
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              value={text2}
              placeholder="Warranty Number"
              onIonChange={(e) => setText2(e.detail.value!)}
              clearInput
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              value={text3}
              placeholder="Warranty Life"
              onIonChange={(e) => setText3(e.detail.value!)}
              clearInput
            ></IonInput>
          </IonItem>

          <IonItemDivider></IonItemDivider>
          <IonListHeader>Purchase Information</IonListHeader>
          <IonItem>
            <IonLabel color="medium">Date of Purchase</IonLabel>
            <IonDatetime
              displayFormat="DDDD MMM D, YYYY"
              min="2020"
              max="2024"
              value={selectedDate}
              onIonChange={(e) => setSelectedDate(e.detail.value!)}
            ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonInput
              value={text4}
              placeholder="Retailer"
              onIonChange={(e) => setText4(e.detail.value!)}
              clearInput
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              value={text5}
              placeholder="Supplier"
              onIonChange={(e) => setText5(e.detail.value!)}
              clearInput
            ></IonInput>
          </IonItem>
        </IonList>
        <IonItemDivider></IonItemDivider>
        <IonListHeader>Photos</IonListHeader>

        <IonSlides scrollbar={true} pager={true} options={slideOpts}>
          <IonSlide>
            <IonCard>
              <IonButton fill="clear" onClick={takePhoto}>
                <IonIcon icon={image}></IonIcon>Add Product Photo
              </IonButton>
              {photos.map((photo, index) => (
                <IonImg src={photo.webviewPath} />
              ))}{" "}
            </IonCard>
          </IonSlide>
          <IonSlide>
            <IonCard>
              <IonButton fill="clear" onClick={takePhoto1}>
                <IonIcon icon={image}></IonIcon>Add Warranty Photo
              </IonButton>
              {photos1.map((photo, index) => (
                <IonImg src={photo.webviewPath} />
              ))}
            </IonCard>
          </IonSlide>
          <IonSlide>
            <IonCard>
              <IonButton fill="clear" onClick={takePhoto2}>
                <IonIcon icon={image}></IonIcon> Add Receipt Photo
              </IonButton>
              {photos2.map((photo, index) => (
                <IonImg src={photo.webviewPath} />
              ))}
            </IonCard>
          </IonSlide>
        </IonSlides>

        <IonButton expand="block">Add</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddWarranty;
