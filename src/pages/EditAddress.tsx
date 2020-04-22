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
  IonToast,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import "./EditAddress.css";
import { RouteComponentProps } from "react-router-dom";
import { Address } from "./Profile";

interface RouteParam {
  id: string;
}
interface Match extends RouteComponentProps<RouteParam> {
  params: string;
}

const EditAddress: React.FC<Match> = ({ match }) => {
  const [showToast1, setShowToast1] = useState(false);

  const [homenum, setHomeNum] = useState("");
  const [street, setStreet] = useState("");
  const [subdist, setSubDist] = useState("");
  const [dist, setDist] = useState("");
  const [province, setProvince] = useState("");
  const [streetCode, setStreetCode] = useState("");

  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line
  }, []);

  const editAddress = async () => {
    try {
      const data = await fetch(
        "http://localhost:8001/customer/address/edit/" + match.params.id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.token,
          },
          body: JSON.stringify({
            houseNo: homenum,
            street: street,
            subDistrict: subdist,
            district: dist,
            province: province,
            zipcode: streetCode,
          }),
        }
      );
      console.log(data);
    } catch (error) {
      //
    }
  };
  const [item, setItem] = useState<Address[]>([]);
  const fetchItem = async () => {
    const data = await fetch("http://localhost:8001/customer/address/get", {
      headers: {
        Authorization: localStorage.token,
      },
    });

    const item = await data.json();
    setItem(item);
    console.log(item);

    const house_no: string = item.getAddress[0].house_no;
    const street: string = item.getAddress[0].street;
    const subdistrict: string = item.getAddress[0].sub_district;
    const district: string = item.getAddress[0].district;
    const province: string = item.getAddress[0].province;
    const zipcode: string = item.getAddress[0].zipcode;
    setHomeNum(house_no);
    setStreet(street);
    setSubDist(subdistrict);
    setDist(district);
    setProvince(province);
    setStreetCode(zipcode);
  };

  const onHandleSave = () => {
    setShowToast1(true);
    editAddress();
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
            <IonTitle class="title">Edit Address</IonTitle>
          </IonToolbar>
        </IonHeader>
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
              <IonLabel position="fixed">Sub-District</IonLabel>
              <IonInput
                class="input"
                required
                type="text"
                value={subdist}
                onIonChange={(e) => setSubDist(e.detail.value!)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="fixed">District</IonLabel>
              <IonInput
                class="input"
                required
                type="text"
                value={dist}
                onIonChange={(e) => setDist(e.detail.value!)}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="fixed">Province</IonLabel>
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
                value={streetCode}
                onIonChange={(e) => setStreetCode(e.detail.value!)}
              ></IonInput>
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
          routerLink={`/editAddress/${match.params.id}`}
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
export default EditAddress;
