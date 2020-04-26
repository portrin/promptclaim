import React from "react";
import { Route } from "react-router-dom";
import {
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { refresh, addCircleOutline, document } from "ionicons/icons";
import HistoryPage from "../pages/history";
import MyWarranty from "../pages/MyWarranty";
import AddWarranty from "../pages/AddWarranty";

const Tab: React.FC = () => {
  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="myWarranty" href="/myWarranty">
        <IonIcon icon={document} />
        <IonLabel>Warranty</IonLabel>
      </IonTabButton>
      <IonTabButton tab="addWarranty" href="/addWarranty">
        <IonIcon icon={addCircleOutline} />
        <IonLabel>Add Warranty</IonLabel>
      </IonTabButton>
      <IonTabButton tab="history" href="/history">
        <IonIcon icon={refresh} />
        <IonLabel>History</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default Tab;
// <Redirect exact from="/" to="/home" />
