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
import NotificationItem from "../components/NotificationItem";

export interface Character {
  name: string;
  char_id: string;
  img: string;
  status: string;
}
export interface Itemprops {
  item: Character;
}

const Notification: React.FC<Itemprops> = () => {
  useEffect(() => {
    fetchItems();
  }, []);
  const [items, setItems] = useState<Character[]>([]);
  const fetchItems = async () => {
    const data = await fetch("https://www.breakingbadapi.com/api/characters/");

    const items = await data.json();
    setItems(items);
    console.log(items);
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
            <h2>March</h2>
          </IonListHeader>
          {items.map((item) => (
            <NotificationItem
              image={item.img}
              name={item.name}
              description={item.char_id}
              expiredDate={item.status}
            ></NotificationItem>
          ))}
          <NotificationItem
            image={SamsungFrig}
            name="Samsuang Refrigerator"
            description="Macro"
            expiredDate="Today"
          />
          <NotificationItem
            image={SamsungTV}
            name="Samsuang Television"
            description="Powerbuy"
            expiredDate="in 2 days"
          />
          <NotificationItem
            image={LGTV}
            name="LG Television"
            description="Central Rama3"
            expiredDate=" in 1 day"
          />
          <NotificationItem
            image={ToshibaAir}
            name="Toshiba Air Conditioner"
            description="Powerbuy"
            expiredDate=""
          />
          <IonListHeader>
            <h2>January</h2>
          </IonListHeader>
          <NotificationItem
            image={WoodTable}
            name="Wooden Round table "
            description="Homepro"
            expiredDate=""
          />
          <NotificationItem
            image={Chandelier}
            name="Chandelier"
            description="Boonthavorn"
            expiredDate=""
          />
          <NotificationItem
            image={WorkLamp}
            name="IKEA Work lamp"
            description="IKEA"
            expiredDate=""
          />
          <NotificationItem
            image={SamsungFrig}
            name="Samsuang Refrigerator"
            description="Macro"
            expiredDate=""
          />

          <IonItemDivider color="light">
            <IonLabel>
              <h1>2019</h1>
            </IonLabel>
          </IonItemDivider>

          <IonListHeader>
            <h2>December</h2>
          </IonListHeader>

          <NotificationItem
            image={SamsungFrig}
            name="Samsuang Refrigerator"
            description="Macro"
            expiredDate=""
          />

          <NotificationItem
            image={SamsungFrig}
            name="Samsuang Refrigerator"
            description="Macro"
            expiredDate=""
          />
          <NotificationItem
            image={SamsungFrig}
            name="Samsuang Refrigerator"
            description="Macro"
            expiredDate=""
          />
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default Notification;
