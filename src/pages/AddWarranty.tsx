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
  IonToast,
} from "@ionic/react";
import { image } from "ionicons/icons";
import "./AddWarranty.css";
import { usePhotoGallery } from "../hooks/usePhotoGallery";
import moment from "moment";

const slideOpts = {
  initialSlide: 1,
  speed: 400,
};

const AddWarranty: React.FC = () => {
  const [pname, setPname] = useState<string>("");
  const [serial, setSerial] = useState<string>("");
  const [wranNumber, setWranNumber] = useState<string>();
  const [wranLife, setWranLife] = useState<string>();
  const [pNumber, setPnumber] = useState<string>();
  const [retialer, setRetailer] = useState<string>();
  const [supplier, setSupplier] = useState<string>();
  const { photos, takePhoto } = usePhotoGallery();
  const { photos1, takePhoto1 } = usePhotoGallery();
  const { photos2, takePhoto2 } = usePhotoGallery();
  const today = new Date().toISOString();
  const [selectedDate, setSelectedDate] = useState<string>(
    moment(today).add(0, "days").format()
  );

  const [showToast1, setShowToast1] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [todayD, setTodayD] = useState<string>(new Date().toISOString());

  console.log(JSON.stringify(photos));

  const addProduct = async () => {
    if (serial === "" || pname === "") {
      console.log("no input");
      setShowToast2(true);
    } else {
      const data = await fetch(
        "http://localhost:8001/customer/product/addproduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.token,
          },
          body: JSON.stringify({
            serialNo: serial,
            productNo: "AAAAA1",
            productNickname: pname,
            price: 100,
            createTimestamp: selectedDate,
            isValidate: 0,
            claimQty: 0,
          }),
        }
      );
      console.log(data);
      const response = await data.json();
      console.log(response);
      if (data.status === 200) {
        console.log("Sucess Add");
        setSerial("");
        setPname("");
        setSelectedDate(today);
        setShowToast1(true);
      } else {
        console.log("Fail Add");
      }
    }
  };

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
            <IonLabel position="floating" color="medium">
              Product Name
            </IonLabel>
            <IonInput
              value={pname}
              onIonChange={(e) => setPname(e.detail.value!)}
              clearInput
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating" color="medium">
              Serial Number
            </IonLabel>

            <IonInput
              value={serial}
              onIonChange={(e) => setSerial(e.detail.value!)}
              clearInput
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating" color="medium">
              Warranty Number
            </IonLabel>
            <IonInput
              value={wranNumber}
              onIonChange={(e) => setWranNumber(e.detail.value!)}
              clearInput
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating" color="medium">
              Warranty Life
            </IonLabel>
            <IonInput
              value={wranLife}
              onIonChange={(e) => setWranLife(e.detail.value!)}
              clearInput
            ></IonInput>
          </IonItem>

          <IonItemDivider></IonItemDivider>
          <IonListHeader>Purchase Information</IonListHeader>
          <IonItem>
            <IonLabel position="floating" color="medium">
              Date of Purchase
            </IonLabel>
            <IonDatetime
              displayFormat="DDDD MMM D, YYYY"
              min="2017"
              max={todayD}
              value={selectedDate}
              onIonChange={(e) => setSelectedDate(e.detail.value!)}
            ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel position="floating" color="medium">
              Retailer
            </IonLabel>
            <IonInput
              value={retialer}
              onIonChange={(e) => setRetailer(e.detail.value!)}
              clearInput
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating" color="medium">
              Supplier
            </IonLabel>
            <IonInput
              value={supplier}
              onIonChange={(e) => setSupplier(e.detail.value!)}
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

        <IonButton onClick={addProduct} href="/myWarranty" expand="block">
          Add
        </IonButton>
        <IonToast
          position="bottom"
          color="primary"
          isOpen={showToast1}
          onDidDismiss={() => setShowToast1(false)}
          message="Product Added"
          duration={2000}
        />
        <IonToast
          position="bottom"
          color="danger"
          isOpen={showToast2}
          onDidDismiss={() => setShowToast2(false)}
          message="Input Require"
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default AddWarranty;
