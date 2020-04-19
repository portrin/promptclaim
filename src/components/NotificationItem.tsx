import React from "react";
import { IonItem, IonAvatar, IonLabel, IonNote } from "@ionic/react";

interface Prop {
  image: string;
  name: string;
  description: string;
  remainingDate: string;
}

const NotificationItem: React.FC<Prop> = (props) => {
  const img = props.image;
  return (
    <IonItem>
      <IonAvatar slot="start">
        <img src={img} alt="img" />
      </IonAvatar>
      <IonLabel>
        <h3>{props.name}</h3>
        <h4>{props.description}</h4>
      </IonLabel>
      <IonNote slot="end" color="primary">
        <h6>{`Remaining days  ${props.remainingDate}`}</h6>
      </IonNote>
    </IonItem>
  );
};

export default NotificationItem;
