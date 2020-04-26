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
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonLabel,
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
import TabBar from "../components/Tabs";

export interface Product {
  char_id: string;
  status: string;
  name: string;
  product_nickname: string;
  uuid: string;
  product_photo: string;
  category_name: string;
  retailer_branch_name: string;
}
export interface Productprops {
  item: Product;
}

const MyWarranty: React.FC<Productprops> = () => {
  const [searchText, setSearchText] = useState("");
  const [searchItem, setSearchItem] = useState<Product[]>([]);
  const [sortBy, setsortBy] = useState("");
  const [filterBy, setfilterBy] = useState("default");

  console.log(localStorage.token);

  useEffect(() => {
    fetchItems();
    console.log("111111111111");
  }, []);
  const [items, setItems] = useState<Product[]>([]);
  const fetchItems = async () => {
    const data = await fetch(
      "http://ec2-3-0-20-60.ap-southeast-1.compute.amazonaws.com:8001/customer/product/get",
      {
        headers: {
          Authorization: localStorage.token,
        },
      }
    );
    console.log(data);
    const item = await data.json();
    console.log(item);
    setItems(item);
    console.log(items);
  };

  useEffect(() => {
    setSearchItem(
      items.filter((item) =>
        item.product_nickname.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, items]);
  function sortProduct(item: Array<Product>) {
    if (sortBy === "Name") {
      return item.sort((a, b) =>
        a.product_nickname.localeCompare(b.product_nickname)
      );
    } else if (sortBy === "Name Z-A") {
      return item.sort().reverse();
    } else if (sortBy === "Retailer") {
      return item.sort(
        (a, b) =>
          parseInt(a.retailer_branch_name) - parseInt(b.retailer_branch_name)
      );
    } else {
      return item;
    }
  }
  function filterProduct(item: Array<Product>) {
    if (filterBy === "default") {
      return item;
    } else {
      return item.filter((x) => x.category_name === filterBy);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="theme" class="toolbar2">
          <IonTitle class="title">My Warranty</IonTitle>
          <IonButton
            fill="clear"
            slot="end"
            size="small"
            class="ion-no-padding"
            routerLink="/notification"
            routerDirection="root"
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
            routerLink="/Profile"
            routerDirection="root"
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
          color="lightbutton"
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

                  <IonSelect
                    value={filterBy}
                    cancelText="Cancel"
                    okText="Done"
                    onIonChange={(e) => setfilterBy(e.detail.value)}
                  >
                    <IonSelectOption value="default">All</IonSelectOption>
                    <IonSelectOption value="Wall & Floor">
                      Wall & Floor
                    </IonSelectOption>
                    <IonSelectOption value="Bathroom">Bathroom</IonSelectOption>
                    <IonSelectOption value="Furniture Lifestyle">
                      Furniture Lifestyle
                    </IonSelectOption>
                    <IonSelectOption value="Lighting">Lighting</IonSelectOption>
                    <IonSelectOption value="Home Appliances">
                      Home Appliances
                    </IonSelectOption>
                    <IonSelectOption value="Doors & Windows">
                      Doors & Windows
                    </IonSelectOption>
                    <IonSelectOption value="Paint & Equipment">
                      Paint & Equipment
                    </IonSelectOption>
                    <IonSelectOption value="Tools & Hardware">
                      Tools & Hardware
                    </IonSelectOption>
                    <IonSelectOption value="Garden - Plumbing - DIY">
                      Garden-Plumbing-DIY
                    </IonSelectOption>
                    <IonSelectOption value="Promotion">
                      Promotion
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
                  Sort
                  <IonSelect
                    value={sortBy}
                    cancelText="Cancel"
                    okText="Done"
                    onIonChange={(e) => setsortBy(e.detail.value)}
                  >
                    <IonSelectOption value="Name">By Name A-Z</IonSelectOption>
                    <IonSelectOption value="Name Z-A">
                      By Name Z-A{" "}
                    </IonSelectOption>
                    <IonSelectOption value="Retailer">
                      Retailer Name{" "}
                    </IonSelectOption>
                  </IonSelect>
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>

        <IonList>
          <IonLabel class="labelacc">Products</IonLabel>

          {sortProduct(filterProduct(searchItem)).map((item) => (
            <Product
              name={item.product_nickname}
              serial={item.uuid}
              image={item.product_photo}
              description={item.retailer_branch_name}
              category={item.category_name}
            ></Product>
          ))}
        </IonList>
      </IonContent>
      <TabBar />
    </IonPage>
  );
};

export default MyWarranty;
