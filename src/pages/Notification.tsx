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
} from "@ionic/react";
import "./history.css";
import React, { useState, useEffect } from "react";
import {
  notificationsOutline,
  funnelOutline,
  filterOutline,
  personCircleOutline,
  notifications,
} from "ionicons/icons";

import NotificationItem from "../components/NotificationItem";
import moment from "moment";
import { CONNREFUSED } from "dns";

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
  const [remainingPeriod, setRemainingPeriod] = useState("");
  const [notiItems, setNotiItems] = useState<Product[]>([]);
  const [som, setSom] = useState<Product[]>([]);
  const [poliItems, setPoliItems] = useState<Policy[]>([]);
  const [policy, setPolicy] = useState<Policy[]>([]);
  const [listP, setListP] = useState<Product[]>([]);
  const [UUID, setUUID] = useState<String[]>([]);
  function countDay(dateFormat: string) {
    var today = moment();
    var end = moment();
    return end.diff(today, "days");
  }

  const fetchItems = async () => {
    const data = await fetch("http://localhost:8001/customer/product/get/", {
      headers: {
        Authorization: localStorage.token,
      },
    });
    const items = await data.json();
    setItems(items);
    console.log(items);

  };

  const fetchPolicy = async () => {
    const data = await fetch("http://localhost:8001/customer/policy/get/", {
      headers: {
        Authorization: localStorage.token,
      },
    });
    const policy = await data.json();
    console.log(policy);
    setPolicy(policy);
  };
  const fetchPolicyUUID = async (a: string) => {
    const data = await fetch(
      "http://localhost:8001/customer/policy/getbyUUID/" + a,
      {
        headers: {
          Authorization: localStorage.token,
        },
      }
    );
    const sss = await data.json();
    console.log(sss);
    setUUID(sss);
    return UUID;
  };
  function loopCheck() {
    var arr = new Array<Product>();
    for (var i = 0; i < policy.length; i++) {
      console.log("loop");
      for (var j = 0; j < items.length; j++) {
        console.log("loop");
        if (
          items[j].uuid == policy[i].uuid &&
          moment(policy[j].policy_end_date).diff(moment(), "days") < 30 &&
          moment(policy[j].policy_end_date).diff(moment(), "days") > 0
        ) {
          items[j].remaining =
            moment(policy[j].policy_end_date).diff(moment(), "days") + "";
          arr.push(items[j]);
          console.log(moment(policy[j].policy_end_date).diff(moment(), "days"));
        }
      }
    }
    return arr;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="theme">
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
            <h2>Expiring Products</h2>
          </IonListHeader>
          {loopCheck().map(
            (item) => (
              console.log(policy),
              (
                <NotificationItem
                  image={item.img}
                  name={item.product_name}
                  description={item.category_name}
                  remainingDate={item.remaining}
                ></NotificationItem>
              )
            )
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default Notification;
