import {
  IonContent,
  IonPage,
  IonButton,
  IonInput,
  IonLabel,
  IonItem,
  IonCard,
  IonIcon,
  IonImg,
  IonRow,
} from "@ionic/react";
import { mail } from "ionicons/icons";
import React from "react";
import "./Verify.css";
import { RouteComponentProps } from "react-router-dom";

const Verify: React.FC<RouteComponentProps> = (props) => {
  return (
    <IonPage>
      <IonContent color="theme">
        <IonImg class="image" src="assets/translogo.png" alt="logo"></IonImg>
        <IonRow class="ion-justify-content-center">
          <IonLabel class="textsignup">
            {" "}
            Enter the verification code sent to your message{" "}
          </IonLabel>
        </IonRow>

        <IonCard class="card2">
          <IonItem class="item-input-1">
            <IonLabel position="stacked"></IonLabel>
            <IonInput class="input">
              <IonIcon class="icon" icon={mail}></IonIcon>
            </IonInput>
          </IonItem>
        </IonCard>

        <IonButton
          class="confirm"
          strong
          id="signin"
          expand="block"
          color="signinbutton"
          routerLink="/fillinfo"
          routerDirection="root"
        >
          CONFIRM
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Verify;
