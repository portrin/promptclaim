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
  IonApp,
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
export interface Product {
  char_id: string;
  status: string;
  name: string;
  product_name: string;
  uuid: string;
  img: string;
  category_name: string;
}
export interface Productprops {
  item: Product;
}

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTg3MjEwNzIyNTEyfQ.reHTXr9EJrnkCDFlTa5Xx78Lvz8YlVfZE8OvQFj2mX8";

const MyWarranty: React.FC<Productprops> = () => {
  const [searchText, setSearchText] = useState("");
  const [searchItem, setSearchItem] = useState<Product[]>([]);
  const [sortBy, setsortBy] = useState("");
  const [filterBy, setfilterBy] = useState("default");

  console.log(localStorage.token);
  useEffect(() => {
    fetchItems();
  }, []);
  const [items, setItems] = useState<Product[]>([]);
  const fetchItems = async () => {
    const data = await fetch("http://localhost:8001/customer/product/get", {
      headers: {
        Authorization: localStorage.token,
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
        item.product_name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, items]);
  function sortProduct(item: Array<Product>) {
    if (sortBy === "Name") {
      return item.sort((a, b) => a.product_name.localeCompare(b.product_name));
    } else if (sortBy === "Name Z-A") {
      return item.sort().reverse();
    } else if (sortBy === "Product ID") {
      return item.sort((a, b) => parseInt(a.uuid) - parseInt(b.uuid));
    } else {
      return item;
    }
  }
  function filterProduct(item: Array<Product>) {
    if (filterBy == "default") {
      return item;
    } else {
      return item.filter((x) => x.category_name == filterBy);
    }
  }

  return (
    <IonApp>
      <IonPage>
        <IonHeader class="toolbar">
          <IonToolbar color="theme">
            <IonTitle class="title">My Warranty</IonTitle>
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
            <IonButton
              fill="clear"
              slot="end"
              size="small"
              
              routerLink="/profile/1"
            >
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
    </IonApp>
  );
};

export default MyWarranty;
