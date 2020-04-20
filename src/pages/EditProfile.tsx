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
  IonToast,
} from "@ionic/react";
import { chevronBackOutline, man, woman, chevronDown } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import "./EditProfile.css";
import { Profile } from "./Profile";
import { RouteComponentProps } from "react-router";

interface RouteParam {
  id: string;
}
interface Match extends RouteComponentProps<RouteParam> {
  params: string;
}

const EditProfile: React.FC<Match> = ({ match }) => {
  const [showToast1, setShowToast1] = useState(false);
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [gender, setGender] = useState("");
  const [bdate, setBDate] = useState("");
  const [phonenum, setPhoneNum] = useState("");

  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line
  }, []);

  const [item, setItems] = useState<Profile[]>([]);
  const fetchItem = async () => {
    const data = await fetch("http://localhost:8001/customer/profile/get", {
      headers: {
        Authorization: localStorage.token,
      },
    });

    const item = await data.json();
    setItems(item.getProfile);
    console.log(item.getProfile);
    console.log(item);

    const firstname: string = item.getProfile[0].firstname;
    const lastname: string = item.getProfile[0].lastname;
    const birth_date: string = item.getProfile[0].birth_date;
    const phone_no: string = item.getProfile[0].phone_no;

    setFName(firstname);
    console.log(firstname);
    setLName(lastname);
    setBDate(birth_date);
    setPhoneNum(phone_no);
  };

  const editData = async () => {
    const data = await fetch(
      "http://localhost:8001/customer/profile/edit/" + match.params.id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token,
        },
        body: JSON.stringify({
          firstName: fname,
          lastname: lname,
          birthDate: bdate,
          phone_no: phonenum,
          birth_date: bdate,
        }),
      }
    );
  };
  const onHandleSave = () => {
    setShowToast1(true);
    editData();
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
                {item.map((item) => (
                  <IonLabel class="label"> {item.phone_no}</IonLabel>
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
            routerLink={`/editProfile/${match.params.id}`}
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
    </IonApp>
  );
};
export default EditProfile;
