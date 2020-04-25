import React from "react";
import {
  IonItem,
  IonCard,
  IonLabel,
  IonCardSubtitle,
  IonButton,
  IonCardContent,
  IonThumbnail,
  IonImg,
} from "@ionic/react";
import { Link } from "react-router-dom";

interface Prop {
  image: string;
  name: string;
  description: string;
  serial: string;
  category: string;
}

const WarrantyItem: React.FC<Prop> = (props) => {

  return (
    <IonCard>
      <IonItem>
        <IonThumbnail slot="start">
        <IonImg src={props.image} alt="product img" />
        </IonThumbnail>
        <IonLabel>
          <IonLabel>{props.name}</IonLabel>
          <IonCardSubtitle>{props.category}</IonCardSubtitle>
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
