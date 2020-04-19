import {
  IonContent,
  IonPage,
  IonButton,
  IonApp,
  IonHeader,
  IonToolbar,
  IonIcon,
  IonTitle,
  IonLabel,
  IonCard,
  IonList,
  IonItem,
  IonInput,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import "./EditAccount.css";
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

const EditAccount: React.FC<Match> = ({ match }) => {
  console.log(match);
  console.log(match.params.id);
  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line
  }, []);
  const [item, setItem] = useState<Character[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
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
              <IonButton color="theme" href="/profile">
                <IonIcon icon={chevronBackOutline}></IonIcon>
              </IonButton>
              <IonTitle class="title">Edit Account</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonLabel class="label">Change E-mail</IonLabel>

          <IonCard class="card3">
            <IonList>
              <IonItem>
                <IonLabel>Current E-mail</IonLabel>
                {item.map((item) => (
                  <IonLabel class="info">{item.name}</IonLabel>
                ))}
              </IonItem>
              <IonItem>
                <IonLabel>New E-mail</IonLabel>
                <IonInput
                  class="input"
                  value={newEmail}
                  onIonChange={(e) => setNewEmail(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonList>
          </IonCard>
          <IonLabel class="label">Change Password</IonLabel>
          <IonCard>
            <IonList>
              <IonItem>
                <IonLabel>Current Password</IonLabel>
                <IonInput class="input" required type="password"></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel>New Password</IonLabel>
                <IonInput
                  class="input"
                  required
                  type="password"
                  value={newPassword}
                  onIonChange={(e) => setNewPassword(e.detail.value!)}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel>Confirm New Password</IonLabel>
                <IonInput
                  class="input"
                  required
                  type="password"
                  value={newPassword2}
                  onIonChange={(e) => setNewPassword2(e.detail.value!)}
                ></IonInput>
              </IonItem>
              <div className="note">
                * Password must be at least 8 characters
              </div>
            </IonList>
          </IonCard>
          <IonButton
            class="savebutt"
            strong
            id="saveacc"
            size="large"
            color="theme"
            expand="block"
            href="/profile"
          >
            SAVE
          </IonButton>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};
export default EditAccount;
