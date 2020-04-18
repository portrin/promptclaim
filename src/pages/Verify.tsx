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
import { mail } from "ionicons/icons";
import React from "react";
import "./Verify.css";
import { RouteComponentProps, Link } from "react-router-dom";

const Verify: React.FC<RouteComponentProps> = (props) => {
  return (
    <IonApp>
      <IonPage>
        <IonContent color="theme">
          <div className="image">
            <img src="assets/translogo.png" alt="logo" />
          </div>
          <div className="text-item">
            <p className="text">
              {" "}
              Enter the verification code <br /> sent to your message.{" "}
              <a
                className="text2"
                href="https://ionicframework.com/docs/components"
              >
                {" "}
                Resend
              </a>
            </p>
          </div>

          <IonCard class="card2">
            <IonItem class="item-input-1">
              <IonLabel position="stacked"></IonLabel>
              <IonInput class="input" type="number">
                <IonIcon class="icon" icon={mail}></IonIcon>
              </IonInput>
            </IonItem>
          </IonCard>
          <Link to={"/fillinfo"}>
            <IonButton
              class="confirm"
              strong
              id="signin"
              size="large"
              color="signinbutton"
            >
              CONFIRM
            </IonButton>
          </Link>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Verify;
