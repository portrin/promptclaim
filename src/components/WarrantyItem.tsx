import React from "react";
import {
  IonItem,
  IonCard,
  IonLabel,
  IonCardSubtitle,
  IonButton,
  IonCardContent,
  IonThumbnail,
  IonNav,
} from "@ionic/react";
interface Prop {
  image: string;
  name: string;
  description: string;
  serial: string;
}

const HistoryItem: React.FC<Prop> = (props) => {
  const img = props.image;
  return (
    <IonCard>
      <IonItem>
        <IonThumbnail slot="start">
          <img src={props.image} />
        </IonThumbnail>
        <IonLabel>
          <h2>{props.name}</h2>
          <IonCardSubtitle>{props.serial}</IonCardSubtitle>
        </IonLabel>
        <IonButton fill="outline" slot="end" routerLink="/warrantyInfo">
          View
        </IonButton>
      </IonItem>

      <IonCardContent>{props.description}</IonCardContent>
    </IonCard>
  );
};

export default HistoryItem;
