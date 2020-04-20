import {
  IonContent,
  IonPage,
  IonButton,
  IonApp,
  IonInput,
  IonLabel,
  IonItem,
  IonCard,
  IonIcon,
} from "@ionic/react";
import { chevronForwardOutline, call } from "ionicons/icons";
import React from "react";
import "./SignUp.css";

const SignUp: React.FC = () => {
  return (
    <IonApp>
      <IonPage>
        <IonContent color="theme">
          <div className="image">
            <img src="assets/translogo.png" alt="logo" />
          </div>

          <IonCard class="card2">
            <IonItem class="item-input-1">
              <IonLabel position="stacked">Enter your phone number</IonLabel>
              <IonInput class="input" type="number">
                {" "}
                <IonIcon class="icon" icon={call}></IonIcon>
              </IonInput>
            </IonItem>
          </IonCard>

          <IonButton
            class="next"
            strong
            id="signin"
            size="large"
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
    </IonApp>
  );
};

export default SignUp;
