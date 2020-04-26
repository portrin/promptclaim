import { IonContent, IonPage, IonButton, IonImg } from "@ionic/react";
import React from "react";
import "./Authen.css";

const Authen: React.FC = () => {
  return (
    <IonPage>
      <IonContent color="theme">
        <IonImg
          class="image"
          src="assets/translogo.png"
          alt="logo"
        ></IonImg>

        <IonButton
          strong
          class="padIn"
          id="signin"
          size="large"
          expand="block"
          color="lightbutton"
          routerLink="/signin"
          routerDirection="root"
        >
          SIGN IN
        </IonButton>
        <IonButton
          strong
          class="padUp"
          id="signup"
          fill="outline"
          size="large"
          expand="block"
          color="lightbutton"
          routerLink="/signup"
          routerDirection="root"
        >
          SIGN UP
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Authen;
