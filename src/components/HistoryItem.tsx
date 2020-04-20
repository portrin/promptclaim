import React from "react";
import { IonItem, IonAvatar, IonLabel, IonNote, IonImg } from "@ionic/react";
interface Prop {
  image: string;
  name: string;
  description: string;
  date: string;
}

const HistoryItem: React.FC<Prop> = (props) => {
  return (
    <IonItem>
      <IonAvatar slot="start">
        <IonImg src={props.image} alt="img" />
      </IonAvatar>
      <IonLabel>{props.name}</IonLabel>
      <IonLabel>{props.description}</IonLabel>
      <IonNote slot="end" color="primary">
        <IonLabel>Claimed on {props.date.split("T")[0]}</IonLabel>
      </IonNote>
    </IonItem>
  );
};

export default HistoryItem;
