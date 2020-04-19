import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonListHeader,
  IonItemDivider,
  IonLabel,
} from "@ionic/react";
import "./history.css";
import React, { useState, useEffect } from "react";
import SamsungTV from "../pictures/samsungTV.jpg";
import LGTV from "../pictures/LGTV.jpeg";
import ToshibaAir from "../pictures/toshibaAir.jpg";
import WorkLamp from "../pictures/hektar-work-lamp.jpeg";
import WoodTable from "../pictures/woodTable.jpg";
import SamsungFrig from "../pictures/samsungRefrigerator.jpg";
import Chandelier from "../pictures/chandelier.jpeg";
import HistoryItem from "../components/HistoryItem";

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
        <IonToolbar color="primary">
          <IonTitle>History</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          <IonListHeader>
            <h2>March</h2>
          </IonListHeader>
          {items.map((item) => (
            <HistoryItem
              image={item.img}
              name={item.product_name}
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
