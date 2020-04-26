import {
  IonContent,
  IonPage,
  IonButton,
  IonHeader,
  IonToolbar,
  IonIcon,
  IonTitle,
  IonCard,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonChip,
  IonDatetime,
  IonToast,
} from "@ionic/react";
import { chevronBackOutline, man, woman, chevronDown } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import "./EditProfile.css";
import { Profile, ProfileProps } from "./Profile";

const EditProfile: React.FC<ProfileProps> = () => {
  const [showToast1, setShowToast1] = useState(false);
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [gender, setGender] = useState("");
  const [bdate, setBDate] = useState("");
  const [phonenum, setPhoneNum] = useState("");

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, []);

  const [items, setItems] = useState<Profile[]>([]);
  const fetchItems = async () => {
    const data = await fetch(
      "http://ec2-54-169-201-208.ap-southeast-1.compute.amazonaws.com:8001/customer/profile/get",
      {
        headers: {
          Authorization: localStorage.token,
        },
      }
    );

    const items = await data.json();
    setItems(items.getProfile);
    console.log(items.getProfile);
    console.log(items);

    const firstname: string = items.getProfile[0].firstname;
    const lastname: string = items.getProfile[0].lastname;
    const birth_date: string = items.getProfile[0].birth_date;
    const phone_no: string = items.getProfile[0].phone_no;

    console.log(firstname);
    setFName(firstname);

    setLName(lastname);
    setBDate(birth_date);
    setPhoneNum(phone_no);
  };

  const [items2, setItems2] = useState<Profile[]>([]);
  const editData = async () => {
    const data2 = await fetch(
      "http://ec2-54-169-201-208.ap-southeast-1.compute.amazonaws.com:8001/customer/profile/edit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token,
        },
        body: JSON.stringify({
          firstname: fname,
          lastname: lname,
          phone_no: phonenum,
          birth_date: bdate,
        }),
      }
    );
    console.log(data2);

    const items2 = await data2.json();
    setItems2(items2.getProfile);
    console.log(fname);
  };

  const onHandleSave = () => {
    setShowToast1(true);
    editData();
  };

  return (
    <IonPage>
      <IonContent color="lightbutton">
        <IonHeader class="toolbar">
          <IonToolbar color="theme">
            <IonButton
              color="theme"
              routerLink="/Profile"
              routerDirection="root"
            >
              <IonIcon icon={chevronBackOutline}></IonIcon>
            </IonButton>
            <IonTitle class="title">Edit Profile</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard class="card3">
          <IonList>
            <IonItem>
              <IonLabel position="fixed">First Name</IonLabel>

              <IonInput
                class="input"
                required
                type="text"
                value={fname}
                onIonChange={(e) => setFName(e.detail.value!)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="fixed">Last Name</IonLabel>
              <IonInput
                class="input"
                required
                type="text"
                value={lname}
                onIonChange={(e) => setLName(e.detail.value!)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="fixed">Gender</IonLabel>
              <IonChip
                class="chip"
                outline
                color="primary"
                id={gender}
                onClick={() => {
                  setGender("male");
                }}
              >
                <IonIcon size="large" icon={man} color="primary" />
              </IonChip>
              <IonChip
                class="chip"
                outline
                color="primary"
                id={gender}
                onClick={() => {
                  setGender("female");
                }}
              >
                <IonIcon size="large" icon={woman} color="primary" />
              </IonChip>
              <IonChip
                class="chip2"
                outline
                color="primary"
                id={gender}
                onClick={() => {
                  setGender("notspecified");
                }}
              >
                <p>Not Specified </p>
              </IonChip>
            </IonItem>

            <IonItem>
              <IonLabel position="fixed">Birthdate</IonLabel>

              <IonDatetime
                class="input"
                displayFormat="DD MMM YYYY"
                pickerFormat="DD MMM YYYY"
                max="2005"
                value={bdate}
                onIonChange={(e) => setBDate(e.detail.value!)}
              >
                {" "}
              </IonDatetime>
              <IonIcon slot="end" size="small" icon={chevronDown}></IonIcon>
            </IonItem>

            <IonItem>
              <IonLabel>Phone No.</IonLabel>
              {items.map((item) => (
                <IonLabel class="labelpn"> {item.phone_no}</IonLabel>
              ))}
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
          routerLink={"/Profile"}
          routerDirection="root"
          onClick={onHandleSave}
        >
          SAVE
        </IonButton>
        <IonToast
          isOpen={showToast1}
          onDidDismiss={() => setShowToast1(false)}
          message="Your address have been saved."
          duration={200}
          position="middle"
        />
      </IonContent>
    </IonPage>
  );
};
export default EditProfile;
