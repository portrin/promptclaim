import {
  IonContent,
  IonPage,
  IonButton,
  IonApp,
  IonHeader,
  IonToolbar,
  IonIcon,
  IonTitle,
  IonCard,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import "./EditAddress.css";
import { RouteComponentProps } from "react-router-dom";

export interface Character {
  name: string;
  char_id: string;
  img: string;
  status: string;
}

export interface Itemprops {
  item: Character;
}

interface RouteParam {
  id: string;
}
interface Match extends RouteComponentProps<RouteParam> {
  params: string;
}

const EditAddress: React.FC<Match> = ({ match }) => {

  console.log(match);
  console.log(match.params.id);
  useEffect(() => {
    fetchItem();
  }, []);
  const [item, setItem] = useState<Character[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const fetchItem = async () => {
    const data = await fetch(
      "https://www.breakingbadapi.com/api/characters/" + match.params.id
    );

    const item = await data.json();
    setItem(item);
    console.log(item);
  };
  return (
    <IonApp>
      <IonPage>
        <IonContent color="lightbutton">
          <IonHeader class="toolbar">
            <IonToolbar color="theme">
              <IonButton color="theme" routerLink="/Profile">
                <IonIcon icon={chevronBackOutline}></IonIcon>
              </IonButton>
              <IonTitle class="title">Edit Address</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonCard class="card">
            <IonList>
              <IonItem>
                <IonLabel position="fixed">Home No.</IonLabel>
                <IonInput class="input" required type="text"></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Street</IonLabel>
                <IonInput class="input" required type="text"></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Sub-District</IonLabel>
                <IonInput class="input" required type="text"></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">District</IonLabel>
                <IonInput class="input" required type="text"></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Province</IonLabel>
                <IonInput class="input" required type="text"></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Street Code</IonLabel>
                <IonInput class="input" required type="number"></IonInput>
              </IonItem>
            </IonList>
          </IonCard>
          <IonButton
            class="savebutt"
            strong
            id="saveacc"
            size="large"
            color="theme"
            expand="block"
          >
            SAVE
          </IonButton>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};
export default EditAddress;
