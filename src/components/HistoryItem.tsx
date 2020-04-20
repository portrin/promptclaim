import React from "react";
import { IonItem, IonAvatar, IonLabel, IonNote, IonImg } from "@ionic/react";
interface Prop {
  image: string;
  name: string;

  date: string;
}

const HistoryItem: React.FC<Prop> = (props) => {
  return (
    <IonItem>
      <IonAvatar slot="start">
        <IonImg src={props.image} alt="img" />
      </IonAvatar>
      <IonLabel>
        {props.name}
        <IonNote slot="end" color="primary">
          <p>Claimed on {props.date.split("T")[0]}</p>
        </IonNote>
      </IonLabel>
    </IonItem>
  );
};

export default HistoryItem;
