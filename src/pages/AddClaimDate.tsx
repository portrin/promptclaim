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
  IonCardSubtitle,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";

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

const slideOpts = {
  initialSlide: 1,
  speed: 400,
};
const AddClaimDate: React.FC<Match> = ({ match }) => {
  console.log(match);
  const [text, setText] = useState<string>();
  const [text1, setText1] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<string>(
    "2020-03-27T17:51:31+0000"
  );
  useEffect(() => {
    fetchItems();
  }, []);
  const [item, setItem] = useState<Product[]>([]);
  
  const fetchItems = async () => {
    const data = await fetch(
      "http://localhost:8001/customer/claimlog/getByUuid/" + match.params.id,
      {
        headers: {
          Authorization: localStorage.token,
        },
      }
    );
    console.log(data);
    const item = await data.json();
    setItem(item);
    console.log(item);
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
              min="2020"
              max="2024"
              value={selectedDate}
              onIonChange={(e) => setSelectedDate(e.detail.value!)}
            ></IonDatetime>
          </IonItem>
          <IonButton expand="block">Add</IonButton>
          <IonButton
            color="light"
            expand="block"
            routerLink={`warrantyItem/+{id}`}
          >
            Back
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddClaimDate;
