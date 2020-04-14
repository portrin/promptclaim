import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
  IonList,
  IonListHeader,
  IonSearchbar,
} from "@ionic/react";
import {
  notificationsOutline,
  funnelOutline,
  filterOutline,
  personCircleOutline,
} from "ionicons/icons";
import "./MyWarranty.css";

import Product from "../components/WarrantyItem";

import React, { useState, useEffect } from "react";

export interface Character {
  name: string;
  char_id: string;
  img: string;
  status: string;
}
export interface Itemprops {
  item: Character;
}

const MyWarranty: React.FC<Itemprops> = () => {
  const [searchText, setSearchText] = useState("");
  const [searchItem, setSearchItem] = useState<Character[]>([]);

  console.log(searchText);
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

  useEffect(() => {
    setSearchItem(
      items.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, items]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>MyWarranty</IonTitle>
          <IonButton
            fill="clear"
            slot="end"
            size="small"
            class="ion-no-padding"
            routerLink="/notification"
          >
            <IonIcon
              size="medium"
              icon={notificationsOutline}
              color="light"
            ></IonIcon>
          </IonButton>
          <IonButton fill="clear" slot="end" size="small">
            <IonIcon
              size="medium"
              icon={personCircleOutline}
              color="light"
            ></IonIcon>
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonSearchbar
          animated
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value!)}
        ></IonSearchbar>
        <IonToolbar class="ion-no-padding" color="">
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton size="small" fill="clear">
                  <IonIcon icon={filterOutline} />
                  Filter
                </IonButton>
              </IonCol>
              <IonCol></IonCol>
              <IonCol></IonCol>
              <IonCol></IonCol>
              <IonCol>
                <IonButton size="small" fill="clear">
                  <IonIcon icon={funnelOutline} />
                  Sort
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>

        <IonList>
          <IonListHeader class="ion-no-start">
            <h2>Products</h2>
          </IonListHeader>
          {searchItem.map((item) => (
            <Product
              name={item.name}
              serial={item.char_id}
              image={item.img}
              description={item.status}
            ></Product>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default MyWarranty;
