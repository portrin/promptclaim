import {
  IonContent,
  IonPage,
  IonButton,
  IonApp,
  IonHeader,
  IonToolbar,
  IonIcon,
  IonTitle,
  IonCard,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import React from "react";
import "./editAddress.css";
import { RouteComponentProps } from "react-router-dom";

const editAddress: React.FC<RouteComponentProps> = (props) => {
  return (
    <IonApp>
      <IonPage>
        <IonContent color="lightbutton">
          <IonHeader class="toolbar">
            <IonToolbar color="theme">
              <IonButton
                color="theme"
                onClick={() => props.history.push("/profile")}
              >
                <IonIcon icon={chevronBackOutline}></IonIcon>
              </IonButton>
              <IonTitle class="title">Edit Address</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonCard class="card">
            <IonList>
              <IonItem>
                <IonLabel position="fixed">Home No.</IonLabel>
                <IonInput class="input" required type="text"></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Street</IonLabel>
                <IonInput class="input" required type="text"></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Sub-District</IonLabel>
                <IonInput class="input" required type="text"></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">District</IonLabel>
                <IonInput class="input" required type="text"></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Province</IonLabel>
                <IonInput class="input" required type="text"></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Street Code</IonLabel>
                <IonInput class="input" required type="number"></IonInput>
              </IonItem>
            </IonList>
          </IonCard>
          <IonButton
            class="savebutt"
            strong
            id="saveacc"
            size="large"
            color="theme"
            expand="block"
          >
            SAVE
          </IonButton>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};
export default editAddress;
