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

export interface Character {
  name: string;
  char_id: string;
  img: string;
  status: string;
}
export interface Itemprops {
  item: Character;
}

const History: React.FC = () => {
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
              name={item.name}
              description={item.char_id}
              expiredDate={item.status}
              key={item.char_id}
            ></HistoryItem>
          ))}
          <HistoryItem
            image={SamsungTV}
            name="Samsuang Television"
            description="Powerbuy"
            expiredDate="yesterday"
            key="1"
          />
          <HistoryItem
            image={LGTV}
            name="LG Television"
            description="Central Rama3"
            expiredDate="on 12/3"
          />
          <HistoryItem
            image={ToshibaAir}
            name="Toshiba Air Conditioner"
            description="Powerbuy"
            expiredDate="on 3/3"
          />
          <IonListHeader>
            <h2>January</h2>
          </IonListHeader>
          <HistoryItem
            image={WoodTable}
            name="Wooden Round table "
            description="Homepro"
            expiredDate="on 25/1"
          />
          <HistoryItem
            image={Chandelier}
            name="Chandelier"
            description="Boonthavorn"
            expiredDate="on 18/1"
          />
          <HistoryItem
            image={WorkLamp}
            name="IKEA Work lamp"
            description="IKEA"
            expiredDate="on 11/1"
          />
          <HistoryItem
            image={SamsungFrig}
            name="Samsuang Refrigerator"
            description="Macro"
            expiredDate="on 3/1"
          />
          <IonItemDivider color="light">
            <IonLabel>
              <h1>2019</h1>
            </IonLabel>
          </IonItemDivider>
          <IonListHeader>
            <h2>December</h2>
          </IonListHeader>
          <HistoryItem
            image={SamsungFrig}
            name="Samsuang Refrigerator"
            description="Macro"
            expiredDate="on 3/1"
          />
          <HistoryItem
            image={SamsungFrig}
            name="Samsuang Refrigerator"
            description="Macro"
            expiredDate="on 3/1"
          />
          <HistoryItem
            image={SamsungFrig}
            name="Samsuang Refrigerator"
            description="Macro"
            expiredDate="on 3/1"
          />
          <HistoryItem
            image={SamsungFrig}
            name="Samsuang Refrigerator"
            description="Macro"
            expiredDate="on 3/1"
          />
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default History;
