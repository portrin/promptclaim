import React from "react";
import {
  IonItem,
  IonCard,
  IonLabel,
  IonCardSubtitle,
  IonButton,
  IonCardContent,
  IonThumbnail,
} from "@ionic/react";
import { Link } from "react-router-dom";

interface Prop {
  image: string;
  name: string;
  description: string;
  serial: string;
}

const WarrantyItem: React.FC<Prop> = (props) => {
  const img = props.image;

  return (
    <IonCard>
      <IonItem>
        <IonThumbnail slot="start">
          <img src={props.image} alt="product img" />
        </IonThumbnail>
        <IonLabel>
          <h2>{props.name}</h2>
          <IonCardSubtitle>{props.serial}</IonCardSubtitle>
        </IonLabel>
        <Link to={`/myWarranty/${props.serial}`}>
          <IonButton fill="outline" slot="end">
            View
          </IonButton>
        </Link>
      </IonItem>

      <IonCardContent>{props.description}</IonCardContent>
    </IonCard>
  );
};

export default WarrantyItem;
