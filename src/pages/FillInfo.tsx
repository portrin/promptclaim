import {
  IonPage,
  IonButton,
  IonApp,
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
import { RouteComponentProps, Link } from "react-router-dom";

const FillInfo: React.FC<RouteComponentProps> = (props) => {
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
    <IonApp>
      <IonPage>
        <IonContent color="lightbutton">
          <IonHeader class="toolbar">
            <IonToolbar color="theme">
              <Link to={"/verify"}>
                <IonButton color="theme">
                  <IonIcon icon={chevronBackOutline}></IonIcon>
                </IonButton>
              </Link>
              <IonTitle class="title">Information</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonLabel class="label">ACCOUNT</IonLabel>
          <IonCard>
            <IonList>
              <IonItem>
                <IonLabel>E-mail</IonLabel>
                <IonInput
                  class="input"
                  required
                  type="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel>Password</IonLabel>
                <IonInput
                  class="input"
                  required
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel>Confirm Password</IonLabel>
                <IonInput
                  class="input"
                  required
                  type="password"
                  value={password2}
                  onIonChange={(e) => setPassword2(e.detail.value!)}
                ></IonInput>
              </IonItem>
              <div className="note">
                * Password must be at least 8 characters
              </div>
            </IonList>
          </IonCard>

          <IonLabel class="label">PROFILE</IonLabel>
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
                <IonInput
                  class="input"
                  required
                  type="text"
                  value={phonenum}
                  onIonChange={(e) => setPhoneNum(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonList>
          </IonCard>

          <IonLabel class="label">ADDRESS</IonLabel>
          <IonCard class="card3">
            <IonList>
              <IonItem>
                <IonLabel position="fixed">Home No.</IonLabel>
                <IonInput
                  class="input"
                  required
                  type="text"
                  value={homenum}
                  onIonChange={(e) => setHomeNum(e.detail.value!)}
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Street</IonLabel>
                <IonInput
                  class="input"
                  required
                  type="text"
                  value={street}
                  onIonChange={(e) => setStreet(e.detail.value!)}
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel>Sub-District</IonLabel>
                <IonInput
                  class="input"
                  required
                  type="text"
                  value={subdist}
                  onIonChange={(e) => setSubDist(e.detail.value!)}
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel>District</IonLabel>
                <IonInput
                  class="input"
                  required
                  type="text"
                  value={dist}
                  onIonChange={(e) => setDist(e.detail.value!)}
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel>Province</IonLabel>
                <IonInput
                  class="input"
                  required
                  type="text"
                  value={province}
                  onIonChange={(e) => setProvince(e.detail.value!)}
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Street Code</IonLabel>
                <IonInput
                  class="input"
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
            id="signin"
            size="large"
            color="theme"
          >
            CREATE ACCOUNT
          </IonButton>

          <a className="skip" href="./signup">
            Skip
          </a>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default FillInfo;
