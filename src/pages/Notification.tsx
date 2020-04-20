import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonListHeader,
} from "@ionic/react";
import "./history.css";
import React, { useState, useEffect } from "react";

import NotificationItem from "../components/NotificationItem";
import moment from "moment";

export interface Character {
  name: string;
  char_id: string;
  img: string;
  status: string;
}
export interface Itemprops {
  item: Character;
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
}
export interface Productprops {
  item: Product;
}
const Notification: React.FC<Itemprops> = () => {
  useEffect(() => {
    fetchItems();
  }, []);
  const [items, setItems] = useState<Product[]>([]);
  const [remainingPeriod, setRemainingPeriod] = useState("");
  const [notiItems, setNotiItems] = useState<Product[]>([]);

  const fetchItems = async () => {
    const data = await fetch("http://localhost:8001/customer/product/get/", {
      headers: {
        Authorization: localStorage.token,
      },
    });
    console.log(data);
    const items = await data.json();
    setItems(items);
    console.log(items);
    if (items[0]!=null) {
    var dateFormat = items[0].create_timestamp.split("T")[0];
    }
    console.log(dateFormat);
    console.log("Days =");
    function countDay() {
      var today = moment();
      var purchase = moment(dateFormat);
      console.log(purchase);
      return today.diff(purchase, "days");
    }
    console.log(countDay());
    setRemainingPeriod(countDay() + "");
    for (var i = 0; i < items.length; i++) {
      var tempItem = new Array<Product>();
      if (
        moment().diff(moment(items[i].create_timestamp), "days") <= 30 &&
        moment().diff(moment(items[i].create_timestamp), "days") > 0
      ) {
        console.log(
          "(Noti) Days =" +
            moment().diff(moment(items.create_timestamp), "days")
        );
        tempItem.push(items[i]);
        setNotiItems(tempItem);
      }
    } catch (error) {
      
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Notification</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          <IonListHeader>
            <h2>Expiring Products</h2>
          </IonListHeader>
          {notiItems.map((item) => (
            <NotificationItem
              image={item.img}
              name={item.product_name}
              description={item.category_name}
              remainingDate={
                moment().diff(moment(item.create_timestamp), "days") + ""
              }
            ></NotificationItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default Notification;
