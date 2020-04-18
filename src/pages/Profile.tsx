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
import React, { useState, useEffect } from "react";
import "./Profile.css";

export interface Character {
  name: string;
  char_id: string;
  img: string;
  status: string;
}
export interface Itemprops {
  item: Character;
}

export interface Profile {
  customer_id: string;
  firstname: string;
  lastname: string;
  phone_no: string;
  birth_date: Date;
  gender: string;
  account_id: string;
}

export interface ProfileProps {
  item: Profile;
}

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTg3MjEwNzIyNTEyfQ.reHTXr9EJrnkCDFlTa5Xx78Lvz8YlVfZE8OvQFj2mX8";

const Profile: React.FC<ProfileProps> = () => {
  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, []);
  const [items, setItems] = useState<Profile[]>([]);
  const fetchItems = async () => {
    const data = await fetch("http://localhost:8001/customer/profile/get", {
      headers: {
        Authorization: localStorage.token,
      },
    });
    console.log(data);
    const items = await data.json();
    setItems(items);
    console.log(items);
  };

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
              href="/editaccount/1"
            >
              edit
            </IonButton>
            <IonLabel class="sublabel">Email :</IonLabel>
            {items.map((item) => (
              <IonLabel class="info">{item.firstname}</IonLabel>
            ))}
          </IonCard>

          <IonLabel class="label">PROFILE</IonLabel>
          <IonCard class="card">
            <IonButton
              class="editicon"
              size="small"
              color="theme"
              fill="outline"
              routerLink="/editprofile/1"
            >
              edit
            </IonButton>
            <IonList class="card">
              <IonLabel class="sublabel">First Name :</IonLabel>
              {items.map((item) => (
                <IonLabel class="info">{item.firstname}</IonLabel>
              ))}
            </IonList>
            <IonList class="card">
              <IonLabel class="sublabel">Last Name :</IonLabel>
              {items.map((item) => (
                <IonLabel class="info">{item.lastname}</IonLabel>
              ))}
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
              href="/editaddress/1"
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
