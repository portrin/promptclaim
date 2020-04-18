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
import React, { useEffect, useState } from "react";
import "./SignIn.css";
import axios from "axios";

const SignIn: React.FC<RouteComponentProps> = (props) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:8001/customer/auth/login", {
        email: "chada@gmail.com",
        password: "chada1",
      })
      .then((response) => {
        console.log(response);

        if (response.data) {
          const token: string = response.data;
          localStorage.setItem("token", token);
        } else if (response.data === "Incorrect") {
        }
        console.log(localStorage.token);
      });
  }, []);

  return (
    <IonApp>
      <IonPage>
        <IonContent color="theme">
          <div className="image">
            <img src="assets/translogo.png" alt="logo" />
          </div>

          <IonCard class="card2">
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
