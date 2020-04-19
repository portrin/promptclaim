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
  IonChip,
  IonDatetime,
} from "@ionic/react";
import { chevronBackOutline, man, woman, chevronDown } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import "./EditProfile.css";
import { Profile } from "./Profile";

export interface ProfileProps {
  item: Profile;
}

const EditProfile: React.FC<ProfileProps> = () => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [gender, setGender] = useState("");
  const [bdate, setBDate] = useState("");

  const [done, setDone] = useState("Edit Profile");
  const [butStat, setButstat] = useState<boolean>(true);

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, []);

  const trigger = () => {
    if (butStat === true) {
      setButstat(false);
      setDone("Done");
    } else {
      setButstat(true);
      setDone("Edit Warranty");
      editData();
    }
  };
  console.log(butStat);

  const [items, setItems] = useState<Profile[]>([]);
  const fetchItems = async () => {
    const data = await fetch("http://localhost:8001/customer/account/get", {
      headers: {
        Authorization: localStorage.token,
      },
    });
    const item = await data.json();
    const firstname: string = item[0].firstname;
    const lastname: string = item[0].lastname;
    const birthDate: string = item[0].birthDate;

    setItems(item.getProfile);
    console.log(item.getProfile);
    setFName(firstname);
    setLName(lastname);
    setBDate(birthDate);
  };

  const [items2, setItems2] = useState<Account[]>([]);

  const editData = async () => {
    const data2 = await fetch("http://localhost:8001/customer/account/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      },
      body: JSON.stringify({
        firstName: fname,
        lastname: lname,
        birthDate: bdate,
      }),
    });
  };

  return (
    <IonApp>
      <IonPage>
        <IonContent color="lightbutton">
          <IonHeader class="toolbar">
            <IonToolbar color="theme">
              <IonButton color="theme" href="/profile">
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
                {items.map((items) => (
                  <IonLabel class="label"> {items.phone_no}</IonLabel>
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
            href="/profile"
          >
            SAVE
          </IonButton>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};
export default EditProfile;
