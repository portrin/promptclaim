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
  birth_date: string;
  gender: string;
  account_id: string;
}
export interface Account {
  email: string;
  password: string;
  account_id: string;
}

export interface Address {
  house_no: string;
  street: string;
  sub_district: string;
  district: string;
  province: string;
  zipcode: string;
  address_id: string;
}

export interface ProfileProps {
  item: Profile;
  item2: Account;
  item3: Address;
}

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
    setItems(items.getProfile);
    console.log(items.getProfile);
  };

  useEffect(() => {
    fetchItems2();
    // eslint-disable-next-line
  }, []);
  const [items2, setItems2] = useState<Account[]>([]);
  const fetchItems2 = async () => {
    const data2 = await fetch("http://localhost:8001/customer/account/get", {
      headers: {
        Authorization: localStorage.token,
      },
    });
    console.log(data2);
    const items2 = await data2.json();
    setItems2(items2.getAccount);
    console.log(items2.getAccount);
    // bdate format : "2005-04-19T00:12:55.890+07:00"
  };

  useEffect(() => {
    fetchItems3();
    // eslint-disable-next-line
  }, []);
  const [items3, setItems3] = useState<Address[]>([]);
  const [items4, setItems4] = useState<Address[]>([]);
  const fetchItems3 = async () => {
    const data3 = await fetch("http://localhost:8001/customer/address/get", {
      headers: {
        Authorization: localStorage.token,
      },
    });
    console.log(data3);
    const items3 = await data3.json();

    setItems3(Array(items3.getAddress[0]));
    setItems4(Array(items3.getAddress[1]));
    console.log(items3.getAddress);
  };

  return (
    <IonPage>
      <IonContent color="signinbutton">
        <IonHeader class="toolbar">
          <IonToolbar color="theme">
            <IonButton
              color="theme"
              routerLink="/mywarranty"
              routerDirection="root"
            >
              <IonIcon icon={chevronBackOutline}></IonIcon>
            </IonButton>
            <IonTitle class="title">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonLabel class="label">ACCOUNT</IonLabel>
        <IonCard class="card">
          {items2.map((item2) => (
            <IonButton
              class="editicon"
              size="small"
              color="theme"
              fill="outline"
              routerLink={"/editaccount"}
              routerDirection="root"
            >
              edit
            </IonButton>
          ))}
          <IonLabel class="sublabel">Email :</IonLabel>
          {items2.map((item2) => (
            <IonLabel class="info">{item2.email}</IonLabel>
          ))}
        </IonCard>

        <IonLabel class="label">PROFILE</IonLabel>
        <IonCard class="card">
          {items.map((item) => (
            <IonButton
              class="editicon"
              size="small"
              color="theme"
              fill="outline"
              routerLink={"/editProfile"}
              routerDirection="root"
            >
              edit
            </IonButton>
          ))}
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
            {items.map((item) => (
              <IonLabel class="info">
                {item.birth_date.substring(0, 10)}
              </IonLabel>
            ))}
          </IonList>
          <IonList class="card">
            <IonLabel class="sublabel">Phone No. :</IonLabel>
            {items.map((item) => (
              <IonLabel class="info">{item.phone_no}</IonLabel>
            ))}
          </IonList>
        </IonCard>

        <IonLabel class="label">ADDRESS</IonLabel>
        <IonCard class="card">
          {items3.map((item3) => (
            <IonButton
              class="editicon"
              size="small"
              color="theme"
              fill="outline"
              routerLink={`/editaddress/${item3.address_id}`}
              routerDirection="root"
            >
              edit
            </IonButton>
          ))}
          <IonList class="card">
            <IonLabel class="sublabel">Home No. :</IonLabel>
            {items3.map((item3) => (
              <IonLabel class="info">{item3.house_no}</IonLabel>
            ))}
          </IonList>
          <IonList class="card">
            <IonLabel class="sublabel">Street :</IonLabel>
            {items3.map((item3) => (
              <IonLabel class="info">{item3.street}</IonLabel>
            ))}
          </IonList>
          <IonList class="card">
            <IonLabel class="sublabel">Sub-District :</IonLabel>
            {items3.map((item3) => (
              <IonLabel class="info">{item3.sub_district}</IonLabel>
            ))}
          </IonList>
          <IonList class="card">
            <IonLabel class="sublabel">District :</IonLabel>
            {items3.map((item3) => (
              <IonLabel class="info">{item3.district}</IonLabel>
            ))}
          </IonList>
          <IonList class="card">
            <IonLabel class="sublabel">Province :</IonLabel>
            {items3.map((item3) => (
              <IonLabel class="info">{item3.province}</IonLabel>
            ))}
          </IonList>
          <IonList class="card">
            <IonLabel class="sublabel">Street Code :</IonLabel>
            {items3.map((item3) => (
              <IonLabel class="info">{item3.zipcode}</IonLabel>
            ))}
          </IonList>
        </IonCard>

        <IonLabel class="label">ADDRESS 2</IonLabel>
        <IonCard class="card">
          {items3.map((item3) => (
            <IonButton
              class="editicon"
              size="small"
              color="theme"
              fill="outline"
              routerLink={`/editaddress/${item3.address_id}`}
              routerDirection="root"
            >
              edit
            </IonButton>
          ))}
          <IonList class="card">
            <IonLabel class="sublabel">Home No. :</IonLabel>
            {items4.map((item4) => (
              <IonLabel class="info">{item4.house_no}</IonLabel>
            ))}
          </IonList>
          <IonList class="card">
            <IonLabel class="sublabel">Street :</IonLabel>
            {items4.map((item4) => (
              <IonLabel class="info">{item4.street}</IonLabel>
            ))}
          </IonList>
          <IonList class="card">
            <IonLabel class="sublabel">Sub-District :</IonLabel>
            {items4.map((item4) => (
              <IonLabel class="info">{item4.sub_district}</IonLabel>
            ))}
          </IonList>
          <IonList class="card">
            <IonLabel class="sublabel">District :</IonLabel>
            {items4.map((item4) => (
              <IonLabel class="info">{item4.district}</IonLabel>
            ))}
          </IonList>
          <IonList class="card">
            <IonLabel class="sublabel">Province :</IonLabel>
            {items4.map((item4) => (
              <IonLabel class="info">{item4.province}</IonLabel>
            ))}
          </IonList>
          <IonList class="card">
            <IonLabel class="sublabel">Street Code :</IonLabel>
            {items4.map((item4) => (
              <IonLabel class="info">{item4.zipcode}</IonLabel>
            ))}
          </IonList>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
