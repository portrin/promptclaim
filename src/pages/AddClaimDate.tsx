import React, { useState } from "react";
import { RefresherEventDetail } from "@ionic/core";
import { IonPage, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import { notifications, call, trash, close, closeCircle } from "ionicons/icons";
const AddClaimDate: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Add Claim Date</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
};

export default AddClaimDate;
