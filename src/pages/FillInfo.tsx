import {
  IonPage,
  IonButton,
  IonInput,
  IonList,
  IonTitle,
  IonCard,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonItem,
  IonLabel,
  IonDatetime,
  IonChip,
  IonContent,
} from "@ionic/react";
import { chevronBackOutline, chevronDown, man, woman } from "ionicons/icons";
import React, { useState } from "react";
import "./FillInfo.css";

interface Prop {
  custID: string;
}

const FillInfo: React.FC<Prop> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [bdate, setBDate] = useState("");
  const [phonenum, setPhoneNum] = useState("");
  const [homenum, setHomeNum] = useState("");
  const [street, setStreet] = useState("");
  const [subdist, setSubDist] = useState("");
  const [dist, setDist] = useState("");
  const [province, setProvince] = useState("");
  const [strcode, setStrCode] = useState("");
  const [gender, setGender] = useState("");

  return (
    <IonPage>
      <IonContent color="lightbutton">
        <IonHeader class="toolbar">
          <IonToolbar color="theme">
            <IonButton color="theme" routerLink="/verify">
              <IonIcon icon={chevronBackOutline}></IonIcon>
            </IonButton>

            <IonTitle class="title">Information</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonLabel class="labelacc">ACCOUNT</IonLabel>
        <IonCard class="card3">
          <IonList>
            <IonItem>
              <IonLabel class="bold">E-mail</IonLabel>
              <IonInput
                class="input-text"
                required
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                placeholder="required"
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel class="bold">Password</IonLabel>
              <IonInput
                class="input-text"
                required
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                placeholder="required"
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel class="bold">Confirm Password</IonLabel>
              <IonInput
                class="input-text"
                required
                type="password"
                value={password2}
                onIonChange={(e) => setPassword2(e.detail.value!)}
                placeholder="required"
              ></IonInput>
            </IonItem>
            <div className="note">* Password must be at least 8 characters</div>
          </IonList>
        </IonCard>

        <IonLabel class="labelacc">PROFILE</IonLabel>
        <IonCard class="card3">
          <IonList>
            <IonItem>
              <IonLabel class="bold">First Name</IonLabel>
              <IonInput
                class="input-text"
                required
                type="text"
                value={fname}
                onIonChange={(e) => setFName(e.detail.value!)}
                placeholder="required"
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel class="bold">Last Name</IonLabel>
              <IonInput
                class="input-text"
                required
                type="text"
                value={lname}
                onIonChange={(e) => setLName(e.detail.value!)}
                placeholder="required"
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel class="bold">Gender</IonLabel>
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
              <IonLabel class="bold">Birthdate</IonLabel>
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
              <IonLabel class="bold">Phone No.</IonLabel>
              <IonInput
                class="input-text"
                required
                type="text"
                value={phonenum}
                onIonChange={(e) => setPhoneNum(e.detail.value!)}
                placeholder="required"
              ></IonInput>
            </IonItem>
          </IonList>
        </IonCard>

        <IonLabel class="labelacc">ADDRESS</IonLabel>
        <IonCard class="card3">
          <IonList>
            <IonItem>
              <IonLabel class="bold">Home No.</IonLabel>
              <IonInput
                class="input-text"
                required
                type="text"
                value={homenum}
                onIonChange={(e) => setHomeNum(e.detail.value!)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel class="bold">Street</IonLabel>
              <IonInput
                class="input-text"
                required
                type="text"
                value={street}
                onIonChange={(e) => setStreet(e.detail.value!)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel class="bold">Sub-District</IonLabel>
              <IonInput
                class="input-text"
                required
                type="text"
                value={subdist}
                onIonChange={(e) => setSubDist(e.detail.value!)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel class="bold">District</IonLabel>
              <IonInput
                class="input-text"
                required
                type="text"
                value={dist}
                onIonChange={(e) => setDist(e.detail.value!)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel class="bold">Province</IonLabel>
              <IonInput
                class="input-text"
                required
                type="text"
                value={province}
                onIonChange={(e) => setProvince(e.detail.value!)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel class="bold">Street Code</IonLabel>
              <IonInput
                class="input-text"
                required
                type="number"
                value={strcode}
                onIonChange={(e) => setStrCode(e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonList>
        </IonCard>

        <IonButton
          class="createacc"
          strong
          expand="block"
          color="theme"
          routerLink="/mywarranty"
          routerDirection="root"
        >
          CREATE ACCOUNT
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default FillInfo;
