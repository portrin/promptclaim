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
import { RouteComponentProps } from "react-router-dom";

const SignUp: React.FC<RouteComponentProps> = (props) => {
  return (
    <IonApp>
      <IonPage>
        <IonContent>
          <div className="image">
            <img src="assets/img/translogo.png" alt="logo" />
          </div>

          <IonCard class="card">
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
            onClick={() => props.history.push("/verify")}
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
