import React, { useState } from "react";
import { RefresherEventDetail } from "@ionic/core";
import {
  IonRefresherContent,
  IonRefresher,
  IonToast,
  IonInfiniteScroll,
  IonImg,
  IonActionSheet,
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonToggle,
  IonListHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonSlide,
  IonHeader,
  IonList,
  IonToolbar,
  IonTitle,
  IonInput,
  IonSlides
} from "@ionic/react";
import { notifications, call, trash, close, closeCircle } from "ionicons/icons";
const AddClaimDate: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Add Claim Date</IonTitle>
        </IonToolbar>
      </IonHeader>

    </IonPage>
  );
};

export default AddClaimDate;