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
import SamsungTV from "../pictures/samsungTV.jpg";
import LGTV from "../pictures/LGTV.jpeg";
import ToshibaAir from "../pictures/toshibaAir.jpg";
import WorkLamp from "../pictures/hektar-work-lamp.jpeg";
import WoodTable from "../pictures/woodTable.jpg";
import Product from "../components/WarrantyItem";

import React, { useState } from "react";
import { Link } from "react-router-dom";

const MyWarranty: React.FC = () => {
  
  const [searchText, setSearchText] = useState("");
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
          showCancelButton="focus"
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

          <Product
            name="LG Television"
            serial="SK2OET5LWE8X"
            image={LGTV}
            description="Living room second floor"
          />

          <Product
            name="IKEA Work Lamp"
            serial="F2M0AD559901"
            image={WorkLamp}
            description="Work lamp purchase from IKEA"
          />

          <Product
            name="Wood Table"
            serial="ES28LE5LWE8X"
            image={WoodTable}
            description="Dining room"
          />

          <Product
            name="Toshiba Airconditioner"
            serial="T2KFHET5LWE9E"
            image={ToshibaAir}
            description="Main living area air conditioner"
          />

          <Product
            name="Samsung Television"
            serial="EK23T5LWE3OP"
            image={SamsungTV}
            description="Master bedroom"
          />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default MyWarranty;
