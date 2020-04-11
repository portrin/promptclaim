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
import React from "react";
import "./editAccount.css";
import { RouteComponentProps } from "react-router-dom";

const editAccount: React.FC<RouteComponentProps> = (props) => {
  return (
    <IonApp>
      <IonPage>
        <IonContent color="lightbutton">
          <IonHeader class="toolbar">
            <IonToolbar color="theme">
              <IonButton
                color="theme"
                onClick={() => props.history.push("/profile")}
              >
                <IonIcon icon={chevronBackOutline}></IonIcon>
              </IonButton>
              <IonTitle class="title">Edit Account</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonLabel class="label">Change E-mail</IonLabel>

          <IonCard>
            <IonList>
              <IonItem>
                <IonLabel>Current E-mail</IonLabel>
                <IonLabel class="info" position="stacked">
                  nirachaploi.a@gmail.com
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>New E-mail</IonLabel>
                <IonInput class="input" required type="email"></IonInput>
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
                <IonInput class="input" required type="password"></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel>Confirm New Password</IonLabel>
                <IonInput class="input" required type="password"></IonInput>
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
          >
            SAVE
          </IonButton>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};
export default editAccount;
