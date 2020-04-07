import React from "react";
import { IonItem, IonAvatar, IonLabel, IonBadge, IonNote } from "@ionic/react";
interface Prop {
  image: string;
  name: string;
  description: string;
  expiredDate: string;
}

const HistoryItem: React.FC<Prop> = props => {
  const img = props.image;
  return (
    <IonItem>
      <IonAvatar slot="start">
        <img src={img} />
      </IonAvatar>
      <IonLabel>
        <h3>{props.name}</h3>
        <h4>{props.description}</h4>
      </IonLabel>
      <IonNote slot="end" color="primary">
        <h6>{`Claimed  ${props.expiredDate}`}</h6>
      </IonNote>
    </IonItem>
  );
};

export default HistoryItem;
