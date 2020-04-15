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
  IonChip,
  IonDatetime,
} from "@ionic/react";
import { chevronBackOutline, man, woman, chevronDown } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import "./EditProfile.css";
import { RouteComponentProps } from "react-router-dom";

import { Character } from "./Profile";

export interface Itemprops {
  item: Character;
}

interface RouteParam {
  id: string;
}
interface Match extends RouteComponentProps<RouteParam> {
  params: string;
}

const EditProfile: React.FC<Match> = ({ match }) => {
  console.log(match);
  console.log(match.params.id);
  useEffect(() => {
    fetchItem();
  }, []);
  const [item, setItem] = useState<Character[]>([]);

  const [fname, setFName] = useState("");

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
              <IonTitle class="title">Edit Profile</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonCard class="card">
            <IonList>
              <IonItem>
                <IonLabel position="fixed">First Name</IonLabel>
                {item.map((item) => (
                  <IonInput
                    class="input"
                    required
                    type="text"
                    value={fname}
                    onIonChange={(e) => setFName(e.detail.value!)}
                  >
                    {item.name}
                  </IonInput>
                ))}

                <IonInput
                  class="input"
                  required
                  type="text"
                  value={fname}
                  onIonChange={(e) => setFName(e.detail.value!)}
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Last Name</IonLabel>
                <IonInput class="input" required type="text"></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Gender</IonLabel>
                <IonChip class="chip" outline color="primary">
                  <IonIcon size="large" icon={man} color="primary" />
                </IonChip>
                <IonChip class="chip" outline color="primary">
                  <IonIcon size="large" icon={woman} color="primary" />
                </IonChip>
                <IonChip class="chip2" outline color="primary">
                  <p>Not Specified </p>
                </IonChip>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Birthdate</IonLabel>
                <IonDatetime
                  class="input"
                  displayFormat="DD MMM YYYY"
                  pickerFormat="DD MMM YYYY"
                  max="2005"
                >
                  {" "}
                </IonDatetime>
                <IonIcon slot="end" size="small" icon={chevronDown}></IonIcon>
              </IonItem>

              <IonItem>
                <IonLabel>Phone No.</IonLabel>
                {item.map((item) => (
                  <IonLabel class="label"> {item.char_id}</IonLabel>
                ))}
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
export default EditProfile;
