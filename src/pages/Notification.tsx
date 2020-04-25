import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonListHeader,
  IonButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import "./history.css";
import React, { useState, useEffect } from "react";
import {
  personCircleOutline,
  notifications,
  chevronBackOutline,
} from "ionicons/icons";

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
  product_nickname: string;
  uuid: string;
  product_photo: string;
  category_name: string;
  create_timestamp: string;
  serial_no: string;
  supplier_name: string;
  contact: string;
  retailer_branch_name: string;
  remaining: string;
}
export interface Productprops {
  item: Product;
}
export interface Policy {
  policy_end_date: string;
  uuid: string;
}
export interface Policyprops {
  item: Policy;
}
const Notification: React.FC<Itemprops> = () => {
  useEffect(() => {
    fetchItems();
    fetchPolicy();
  }, []);
  const [items, setItems] = useState<Product[]>([]);
  const [policy, setPolicy] = useState<Policy[]>([]);

  const fetchItems = async () => {
    const data = await fetch(
      "http://ec2-54-169-201-208.ap-southeast-1.compute.amazonaws.com:8001/customer/product/get/",
      {
        headers: {
          Authorization: localStorage.token,
        },
      }
    );
    const items = await data.json();
    setItems(items);
    console.log(items);
  };

  const fetchPolicy = async () => {
    const data = await fetch(
      "http://ec2-54-169-201-208.ap-southeast-1.compute.amazonaws.com:8001/customer/policy/get/",
      {
        headers: {
          Authorization: localStorage.token,
        },
      }
    );
    const policy = await data.json();
    console.log(policy);
    setPolicy(policy);
  };

  function loopCheck() {
    var arr = new Array<Product>();
    for (var i = 0; i < policy.length; i++) {
      for (var j = 0; j < items.length; j++) {
        if (
          items[j].uuid === policy[i].uuid &&
          moment(policy[i].policy_end_date.split("T")[0]).diff(
            moment(),
            "days"
          ) < 30 &&
          moment(policy[i].policy_end_date.split("T")[0]).diff(
            moment(),
            "days"
          ) > 0
        ) {
          console.log(items[j]);
          console.log(policy[i]);
          arr.push(items[j]);
          items[j].remaining =
            moment(policy[i].policy_end_date.split("T")[0]).diff(
              moment(),
              "days"
            ) + "";
        }
      }
    }
    console.log(arr);
    arr.sort((a,b)=>parseInt(a.remaining)-parseInt(b.remaining))
    return arr;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="theme">
          <IonButton
            color="theme"
            routerLink="/mywarranty"
            routerDirection="root"
          >
            <IonIcon icon={chevronBackOutline}></IonIcon>
          </IonButton>
          <IonTitle class="title">My Warranty</IonTitle>
          <IonButton
            fill="clear"
            slot="end"
            size="small"
            class="ion-no-padding"
            href="/myWarranty"
          >
            <IonIcon size="medium" icon={notifications} color="light"></IonIcon>
          </IonButton>
          <IonButton fill="clear" slot="end" size="small" href="/profile">
            <IonIcon
              size="medium"
              icon={personCircleOutline}
              color="light"
            ></IonIcon>
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>Expiring Products</IonLabel>
          </IonListHeader>
          {loopCheck().map((item) => (
            <NotificationItem
              image={item.product_photo}
              name={item.product_nickname}
              description={item.category_name}
              remainingDate={item.remaining}
            ></NotificationItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default Notification;
