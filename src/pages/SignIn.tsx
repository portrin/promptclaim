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
import { Character } from "./history";
import axios from "axios";

const SignIn: React.FC<RouteComponentProps> = (props) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  axios
    .post("http://localhost:8001/customer/auth/login", {
      email: "chada@gmail.com",
      password: "chada1",
    })
    .then((response) => {
      console.log(response);
      if (response.data.token) {
        setToken(response.data.token);
      } else if (response.data === "Incorrect") {
      }
    });

  const [items, setItems] = useState<Character[]>([]);
  const fetchItems = async () => {
    const data = await fetch("http://localhost:8001/customer/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: "chada@gmail.com", password: "chada1" }),
    });
    console.log(data);
    const items = await data.json();
    setItems(items);
    console.log(items);
  };

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
