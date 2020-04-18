import { IonContent, IonPage, IonButton, IonApp } from "@ionic/react";
import React from "react";
import "./Authen.css";
import { RouteComponentProps } from "react-router-dom";

const Authen: React.FC<RouteComponentProps> = (props) => {
  return (
    <IonApp>
      <IonPage>
        <IonContent color="theme">
          <div className="image">
            <img src="assets/translogo.png" alt="logo" />
          </div>
          <IonButton
            strong
            class="padIn"
            id="signin"
            size="large"
            expand="block"
            color="lightbutton"
            onClick={() => props.history.push("/signin")}
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
            onClick={() => props.history.push("/signup")}
          >
            SIGN UP
          </IonButton>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Authen;
