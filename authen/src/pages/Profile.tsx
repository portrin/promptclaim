import {
  IonPage,
  IonButton,
  IonApp,
  IonList,
  IonTitle,
  IonCard,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonLabel,
  IonChip,
  IonContent,
  IonBackButton,
} from "@ionic/react";
import { chevronBackOutline, woman } from "ionicons/icons";
import React from "react";
import "./Profile.css";
import { RouteComponentProps } from "react-router-dom";

const Profile: React.FC<RouteComponentProps> = (props) => {
  return (
    <IonApp>
      <IonPage>
        <IonContent color="signinbutton">
          <IonHeader class="toolbar">
            <IonToolbar color="theme">
              <IonButton color="theme">
                <IonBackButton />
                <IonIcon icon={chevronBackOutline}></IonIcon>
              </IonButton>
              <IonTitle class="title">Profile</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonLabel class="label">ACCOUNT</IonLabel>
          <IonCard class="card">
            <IonButton
              class="editicon"
              size="small"
              color="theme"
              fill="outline"
              onClick={() => props.history.push("/editaccount")}
            >
              edit
            </IonButton>
            <IonLabel class="sublabel">Email :</IonLabel>
            <IonLabel class="info">nirachaploi.a@gmail.com</IonLabel>
          </IonCard>

          <IonLabel class="label">PROFILE</IonLabel>
          <IonCard class="card">
            <IonButton
              class="editicon"
              size="small"
              color="theme"
              fill="outline"
              onClick={() => props.history.push("/editprofile")}
            >
              edit
            </IonButton>
            <IonList class="card">
              <IonLabel class="sublabel">First Name :</IonLabel>
              <IonLabel class="info">Niracha</IonLabel>
            </IonList>
            <IonList class="card">
              <IonLabel class="sublabel">Last Name :</IonLabel>
              <IonLabel class="info">Ariyamakkagul</IonLabel>
            </IonList>
            <IonList class="card">
              <IonLabel class="sublabel">Gender :</IonLabel>
              <IonChip class="chip" color="primary">
                <IonIcon size="small" icon={woman} color="primary" />
              </IonChip>
            </IonList>
            <IonList class="card">
              <IonLabel class="sublabel">Birthdate :</IonLabel>
              <IonLabel class="info">14 Sep 1999</IonLabel>
            </IonList>
            <IonList class="card">
              <IonLabel class="sublabel">Phone No. :</IonLabel>
              <IonLabel class="info">081-234-5678</IonLabel>
            </IonList>
          </IonCard>

          <IonLabel class="label">ADDRESS</IonLabel>
          <IonCard class="card">
            <IonButton
              class="editicon"
              size="small"
              color="theme"
              fill="outline"
              onClick={() => props.history.push("/editaddress")}
            >
              edit
            </IonButton>
            <IonList class="card">
              <IonLabel class="sublabel">Home No. :</IonLabel>
              <IonLabel class="info">42</IonLabel>
            </IonList>
            <IonList class="card">
              <IonLabel class="sublabel">Street :</IonLabel>
              <IonLabel class="info">P. Sherman</IonLabel>
            </IonList>
            <IonList class="card">
              <IonLabel class="sublabel">Sub-District :</IonLabel>
              <IonLabel class="info">Wallaby Way</IonLabel>
            </IonList>
            <IonList class="card">
              <IonLabel class="sublabel">District :</IonLabel>
              <IonLabel class="info">Newman</IonLabel>
            </IonList>
            <IonList class="card">
              <IonLabel class="sublabel">Province :</IonLabel>
              <IonLabel class="info">Sydney</IonLabel>
            </IonList>
            <IonList class="card">
              <IonLabel class="sublabel">Street Code :</IonLabel>
              <IonLabel class="info">10130</IonLabel>
            </IonList>
          </IonCard>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Profile;

// baby girl
// klodklodklod
