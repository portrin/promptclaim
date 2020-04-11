import {
  IonContent,
  IonPage,
  IonApp,
  IonItem,
  IonButton,
  IonLabel,
  IonIcon,
  IonInput,
  IonCard,
} from "@ionic/react";
import { person, lockClosed } from "ionicons/icons";
import { RouteComponentProps } from "react-router-dom";
import React from "react";
import "./SignIn.css";

const SignIn: React.FC<RouteComponentProps> = (props) => {
  return (
    <IonApp>
      <IonPage>
        <IonContent>
          <div className="image">
            <img src="assets/img/translogo.png" alt="logo" />
          </div>

          <IonCard class="card">
            <IonItem class="item-input-1">
              <IonLabel position="floating">
                <IonIcon icon={person}></IonIcon> E-mail
              </IonLabel>
              <IonInput></IonInput>
            </IonItem>
            <IonItem class="item-input-2">
              <IonLabel position="floating">
                <IonIcon icon={lockClosed}></IonIcon> Password
              </IonLabel>
              <IonInput type="password"></IonInput>
            </IonItem>
          </IonCard>

          <IonButton
            class="signbutt"
            strong
            id="signin"
            size="large"
            color="signinbutton"
          >
            SIGN IN
          </IonButton>

          <div className="text-item">
            <p className="text">
              {" "}
              Don't have account?{" "}
              <a className="text2" href="./signup">
                Sign Up
              </a>
            </p>
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default SignIn;
