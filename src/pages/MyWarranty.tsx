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
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import {
  notificationsOutline,
  funnelOutline,
  filterOutline,
  personCircleOutline,
  fileTray,
  filter,
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

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTg3MjA0ODczMjk1fQ.eqNvP3rP6F_2xxT8EUI5JC2KyZNAyoUPkYKUWTiADSs";

const MyWarranty: React.FC<Itemprops> = () => {
  const [searchText, setSearchText] = useState("");
  const [searchItem, setSearchItem] = useState<Character[]>([]);
  const [sortBy, setsortBy] = useState("");
  const [filterBy, setfilterBy] = useState("Alive");

  console.log(searchText);
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState<Character[]>([]);
  const fetchItems = async () => {
    const data = await fetch("http://localhost:8001/customer/product/get", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    console.log(data);
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
  function sortProduct(item: Array<Character>) {
    if (sortBy === "Name") {
      return item.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "Name Z-A") {
      return item.sort().reverse();
    } else if (sortBy === "Product ID") {
      return item.sort((a, b) => parseInt(a.char_id) - parseInt(b.char_id));
    } else {
      return item;
    }
  }
  function filterProduct(item: Array<Character>) {
    return item.filter((x) => x.status == filterBy);
  }

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
                  Filter by
                  <IonSelect
                    value={filterBy}
                    cancelText="Cancel"
                    okText="Done"
                    onIonChange={(e) => setfilterBy(e.detail.value)}
                  >
                    <IonSelectOption value="Alive">
                      Category: Alive
                    </IonSelectOption>
                    <IonSelectOption value="Deceased">
                      Category: Deceased{" "}
                    </IonSelectOption>
                  </IonSelect>
                </IonButton>
              </IonCol>
              <IonCol></IonCol>
              <IonCol></IonCol>
              <IonCol></IonCol>
              <IonCol>
                <IonButton size="small" fill="clear">
                  <IonIcon icon={funnelOutline} />
                  Sort by
                  <IonSelect
                    value={sortBy}
                    cancelText="Cancel"
                    okText="Done"
                    onIonChange={(e) => setsortBy(e.detail.value)}
                  >
                    <IonSelectOption value="Name">Name A-Z</IonSelectOption>
                    <IonSelectOption value="Name Z-A">
                      Name Z-A{" "}
                    </IonSelectOption>
                    <IonSelectOption value="Expiry Date">
                      Expiry Date
                    </IonSelectOption>
                    <IonSelectOption value="Product ID">
                      Product ID
                    </IonSelectOption>
                  </IonSelect>
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>

        <IonList>
          <IonListHeader class="ion-no-start">
            <h2>Products</h2>
          </IonListHeader>

          {sortProduct(filterProduct(searchItem)).map((item) => (
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
