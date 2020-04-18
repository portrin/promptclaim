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
    // eslint-disable-next-line
  }, []);
  // eslint-disable-next-line
  const [item, setItem] = useState<Character[]>([]);
  const [homenum, setHomeNum] = useState("");
  const [street, setStreet] = useState("");
  const [subdist, setSubDist] = useState("");
  const [dist, setDist] = useState("");
  const [province, setProvince] = useState("");
  const [streetCode, setStreetCode] = useState("");
  const fetchItem = async () => {
    const data = await fetch(
      "https://www.breakingbadapi.com/api/characters/" + match.params.id
    );

    const item = await data.json();
    const name: string = item[0].name;
    const char_id: string = item[0].char_id;
    const status: string = item[0].status;

    setItem(item);
    console.log(item);

    setHomeNum(char_id);
    setStreet(name);
    setSubDist(status);
    setDist(status);
    setProvince(status);
    setStreetCode(char_id);
  };
  return (
    <IonApp>
      <IonPage>
        <IonContent color="lightbutton">
          <IonHeader class="toolbar">
            <IonToolbar color="theme">
              <IonButton color="theme" href="/profile/1">
                <IonIcon icon={chevronBackOutline}></IonIcon>
              </IonButton>
              <IonTitle class="title">Edit Address</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonCard class="card3">
            <IonList>
              <IonItem>
                <IonLabel position="fixed">Home No.</IonLabel>
                <IonInput
                  class="input"
                  required
                  type="text"
                  value={homenum}
                  onIonChange={(e) => setHomeNum(e.detail.value!)}
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Street</IonLabel>
                <IonInput
                  class="input"
                  required
                  type="text"
                  value={street}
                  onIonChange={(e) => setStreet(e.detail.value!)}
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Sub-District</IonLabel>
                <IonInput
                  class="input"
                  required
                  type="text"
                  value={subdist}
                  onIonChange={(e) => setSubDist(e.detail.value!)}
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">District</IonLabel>
                <IonInput
                  class="input"
                  required
                  type="text"
                  value={dist}
                  onIonChange={(e) => setDist(e.detail.value!)}
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Province</IonLabel>
                <IonInput
                  class="input"
                  required
                  type="text"
                  value={province}
                  onIonChange={(e) => setProvince(e.detail.value!)}
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Street Code</IonLabel>
                <IonInput
                  class="input"
                  required
                  type="number"
                  value={streetCode}
                  onIonChange={(e) => setStreetCode(e.detail.value!)}
                ></IonInput>
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
            href="/profile/1"
          >
            SAVE
          </IonButton>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};
export default EditAddress;
