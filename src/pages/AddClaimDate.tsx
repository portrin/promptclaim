import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonButton,
  IonLabel,
  IonDatetime,
  IonToast,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import moment from "moment";

interface RouteParam {
  id: string;
}
interface Match extends RouteComponentProps<RouteParam> {
  params: string;
  //ไม่จำเปน
}
export interface Product {
  product_name: string;
  uuid: string;
  img: string;
  category_name: string;
  create_timestamp: string;
  serial_no: string;
  supplier_name: string;
  contact: string;
  retailer_branch_name: string;
  timestamp: string;
}
export interface Productprops {
  item: Product;
}

const AddClaimDate: React.FC<Match> = ({ match }) => {
  console.log(match);
  const [showToast1, setShowToast1] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString()
  );
  const [todayD, setTodayD] = useState<string>(new Date().toISOString());
  useEffect(() => {
    fetchItems();
  }, []);
  const [item, setItem] = useState<Product[]>([]);
  const [dylink, setDyLink] = useState("/myWarranty/" + match.params.id);

  const fetchItems = async () => {
    const data = await fetch("http://localhost:8001/customer/claimlog/get/", {
      headers: {
        Authorization: localStorage.token,
      },
    });
    console.log(data);
    const item = await data.json();
    setItem(item);
    console.log(item);
    setDyLink("/myWarranty/" + match.params.id);
    setTodayD(moment(todayD).add(0, "days").format());
  };

  const addClaim = async () => {
    const data = await fetch("http://localhost:8001/customer/claimlog/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      },
      body: JSON.stringify({
        timestamp: selectedDate,
        status: "claimed",
        uuid: match.params.id,
        serviceCenterId: null,
        serviceCenterBranchId: null,
      }),
    });
    console.log(data);
    if (data.status === 200) {
      setShowToast1(true);
    }
    fetchItems();
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Add Claim Date</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>Claim Date</IonListHeader>
          {item.map((item) => (
            <IonItem>{item.timestamp.split("T")[0]}</IonItem>
          ))}

          <IonItem>
            <IonLabel position="floating" color="medium">
              Add New Claim Date
            </IonLabel>
            <IonDatetime
              displayFormat="DDDD MMM D, YYYY"
              min="2017"
              max={todayD}
              value={selectedDate}
              onIonChange={(e) => setSelectedDate(e.detail.value!)}
            ></IonDatetime>
          </IonItem>
          <IonButton expand="block" onClick={addClaim} routerDirection="root">
            Add
          </IonButton>
          <IonButton
            color="light"
            expand="block"
            routerLink={dylink}
            routerDirection="root"
          >
            Back
          </IonButton>
        </IonList>
        <IonToast
          position="bottom"
          color="primary"
          isOpen={showToast1}
          onDidDismiss={() => setShowToast1(false)}
          message="Log Update"
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default AddClaimDate;
