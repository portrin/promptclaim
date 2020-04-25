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
  IonToast,
} from "@ionic/react";
import { person, lockClosed } from "ionicons/icons";
import { RouteComponentProps, useHistory } from "react-router-dom";
import React, { useState } from "react";
import "./SignIn.css";
import axios from "axios";

const SignIn: React.FC<RouteComponentProps> = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showToast, setShowToast] = useState(false);

  let history = useHistory();

  const authen = () => {
    axios
      .post(
        "http://ec2-54-169-201-208.ap-southeast-1.compute.amazonaws.com:8001/customer/auth/login",
        {
          email: email,
          password: pass,
        }
      )
      .then((response) => {
        console.log(response);

        if (response.data) {
          const token: string = response.data;

          if (token === "invalid username or password") {
            console.log("Bugg invalid username or password");
            setEmail("");
            setPass("");
            setShowToast(true);
          } else {
            localStorage.setItem("token", token);

            history.push("/myWarranty");
          }
        } else if (response.data === "Incorrect") {
        }
        console.log(localStorage.token);
      });
  };

  return (
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
            <IonInput
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
              clearInput
            ></IonInput>
          </IonItem>
          <IonItem class="item-input-2">
            <IonLabel position="floating">
              <IonIcon icon={lockClosed}></IonIcon> Password
            </IonLabel>
            <IonInput
              type="password"
              value={pass}
              onIonChange={(e) => setPass(e.detail.value!)}
              clearInput
            ></IonInput>
          </IonItem>
        </IonCard>

        <IonButton
          class="signbutt"
          strong
          id="signin"
          size="large"
          color="signinbutton"
          onClick={authen}
          routerDirection="root"
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
        <IonToast
          position="bottom"
          color="danger"
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message=" Invalid Email or Password"
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
