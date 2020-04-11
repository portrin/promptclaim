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
import { RouteComponentProps } from "react-router-dom";

const Verify: React.FC<RouteComponentProps> = (props) => {
  return (
    <IonApp>
      <IonPage>
        <IonContent>
          <div className="image">
            <img src="assets/img/translogo.png" alt="logo" />
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

          <IonCard class="card">
            <IonItem class="item-input-1">
              <IonLabel position="stacked"></IonLabel>
              <IonInput class="input" type="number">
                <IonIcon class="icon" icon={mail}></IonIcon>
              </IonInput>
            </IonItem>
          </IonCard>

          <IonButton
            class="confirm"
            strong
            id="signin"
            size="large"
            color="signinbutton"
            onClick={() => props.history.push("/fillinfo")}
          >
            CONFIRM
          </IonButton>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Verify;
