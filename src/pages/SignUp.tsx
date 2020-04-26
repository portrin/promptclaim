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
} from "@ionic/react";
import { chevronForwardOutline, call } from "ionicons/icons";
import React from "react";
import "./SignUp.css";

const SignUp: React.FC = () => {
  return (
    <IonPage>
      <IonContent color="theme">
      <IonImg class="image" src="assets/translogo.png" alt="logo"></IonImg>

        <IonCard class="card2">
          <IonItem class="item-input-1">
            <IonLabel position="stacked">Enter your phone number</IonLabel>
            <IonInput class="input" required>
              {" "}
              <IonIcon class="icon" icon={call}></IonIcon>
            </IonInput>
          </IonItem>
        </IonCard>

        <IonButton
          class="nextbutt"
          strong
          expand="block"
          color="signinbutton"
          routerLink="/verify"
          routerDirection="root"
        >
          NEXT
          <IonIcon
            class="icon"
            size="small"
            icon={chevronForwardOutline}
          ></IonIcon>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
