import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonListHeader,
  IonLabel,
} from "@ionic/react";
import "./history.css";
import React, { useState, useEffect } from "react";
import HistoryItem from "../components/HistoryItem";

export interface Product {
  product_nickname: string;
  uuid: string;
  product_photo: string;
  category_name: string;
  create_timestamp: string;
  serial_no: string;
  supplier_name: string;
  contact: string;
  retailer_branch_name: string;
  timestamp: string;
  status: string;
}
export interface Productprops {
  item: Product;
}

const History: React.FC = () => {
  useEffect(() => {
    fetchItems();
  }, []);
  const [items, setItems] = useState<Product[]>([]);
  const fetchItems = async () => {
    const data = await fetch("http://localhost:8001/customer/claimlog/get/", {
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
    <IonPage>
      <IonHeader>
        <IonToolbar color="theme" class="toolbar2">
          <IonTitle class="title">History</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>March</IonLabel>
          </IonListHeader>
          {items.map((item) => (
            <HistoryItem
              image={item.product_photo}
              name={item.product_nickname}
              description={item.retailer_branch_name}
              date={item.timestamp}
              key={item.uuid}
            ></HistoryItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default History;
