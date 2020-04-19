import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonButton,
  IonLabel,
  IonDatetime,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";

interface RouteParam {
  id: string;
}
interface Match extends RouteComponentProps<RouteParam> {
  params: string;
  //ไม่จำเปน
}
const slideOpts = {
  initialSlide: 1,
  speed: 400,
};
const AddClaimDate: React.FC<Match> = ({ match }) => {
  console.log(match);

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
            <p>
              <IonDatetime
                displayFormat="DDDD MMM D, YYYY"
                min="2020"
                max="2024"
                value={selectedDate}
              ></IonDatetime>
            </p>
          </IonItem>
          <IonItem>
            <IonLabel position="floating" color="medium">
              Date of Purchase
            </IonLabel>
            <IonDatetime
              displayFormat="DDDD MMM D, YYYY"
              min="2020"
              max="2024"
              value={selectedDate}
              onIonChange={(e) => setSelectedDate(e.detail.value!)}
            ></IonDatetime>
          </IonItem>
          <IonButton expand="block">Add</IonButton>
          <IonButton
            color="light"
            expand="block"
            routerLink={`warrantyItem/+${match.params.id}`}
          >
            Back
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddClaimDate;
