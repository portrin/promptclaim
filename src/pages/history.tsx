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
import TabBar from "../components/Tabs";
import moment from "moment";

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
  claim_log_timestamp: string;
  status: string;
  remaining: string;
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
    const data = await fetch(
      "http://ec2-3-0-20-60.ap-southeast-1.compute.amazonaws.com:8001/customer/claimlog/get/",
      {
        headers: {
          Authorization: localStorage.token,
        },
      }
    );
    console.log(data);
    const res = await data.json();
    setItems(res);
    console.log(res);
  };
  function loopCheck() {
    var arr = new Array<Product>();

    for (var i = 0; i < items.length; i++) {
      if (items[i].claim_log_timestamp != null) {
        items[i].remaining =
          moment(items[i].claim_log_timestamp.split("T")[0]).diff(
            moment(),
            "days"
          ) + "";
        arr.push(items[i]);
        arr
          .sort((a, b) => parseInt(a.remaining) - parseInt(b.remaining))
          .reverse();
      }
    }
    console.log("arr" + arr);
    return arr;
  }

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
            <IonLabel>Claim History</IonLabel>
          </IonListHeader>
          {loopCheck().map((item) => (
            <HistoryItem
              image={item.product_photo}
              name={item.product_nickname}
              date={item.claim_log_timestamp}
              key={item.uuid}
            ></HistoryItem>
          ))}
        </IonList>
      </IonContent>
      <TabBar />
    </IonPage>
  );
};
export default History;
