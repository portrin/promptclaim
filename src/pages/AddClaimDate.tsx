import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonButton,
  IonText,
  IonLabel,
  IonDatetime,
} from "@ionic/react";
import { notifications, call, trash, close, closeCircle } from "ionicons/icons";
const slideOpts = {
  initialSlide: 1,
  speed: 400,
};
const AddClaimDate: React.FC = () => {
  const [text, setText] = useState<string>();
  const [text1, setText1] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<string>(
    "2020-03-27T17:51:31+0000"
  );
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Add Claim Date</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>Claim Date</IonListHeader>
          <IonItem>
            <p><IonDatetime
              displayFormat="DDDD MMM D, YYYY"
              min="2020"
              max="2024"
              value={selectedDate}
            ></IonDatetime></p>
          </IonItem>
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
          <IonButton expand="block">Add</IonButton>
          <IonButton color="light" expand="block" routerLink="warrantyItem/+'{id}'">Back</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddClaimDate;
