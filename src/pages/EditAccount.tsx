import {
  IonContent,
  IonPage,
  IonButton,
  IonApp,
  IonHeader,
  IonToolbar,
  IonIcon,
  IonTitle,
  IonLabel,
  IonCard,
  IonList,
  IonItem,
  IonInput,
  IonToast,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import "./EditAccount.css";
import { Account } from "./Profile";

export interface ProfileProps {
  item: Account;
}

const EditAccount: React.FC<ProfileProps> = () => {
  const [showToast1, setShowToast1] = useState(false);
  const [oldPass, setOldPass] = useState("");
  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, []);
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [items, setItems] = useState<Account[]>([]);
  const fetchItems = async () => {
    const data = await fetch("http://localhost:8001/customer/account/get", {
      headers: {
        Authorization: localStorage.token,
      },
    });
    console.log(data);
    const items = await data.json();
    setItems(items.getAccount);
    console.log(items.getAccount);
    const password1: string = items.getAccount[0].password;
    console.log(password1);
    setOldPass(password1);
  };

  const [items2, setItems2] = useState<Account[]>([]);
  const editData = async () => {
    const data2 = await fetch("http://localhost:8001/customer/account/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      },
      body: JSON.stringify({
        email: newEmail,
        password: newPassword,
      }),
    });
    console.log(data2);
    const items2 = await data2.json();
    setItems2(items2.getAccount);
    console.log(items2.getAccount);
  };

  function validateForm(password: string) {
    return (
      password === currentPassword &&
      newPassword.length > 8 &&
      newPassword === newPassword2
    );
  }

  const sendNewPass = () => {
    if (validateForm(oldPass)) {
      editData();
    } else {
      console.log("bug");
    }
  };

  const onHandleSave = () => {
    setShowToast1(true);
    sendNewPass();
  };

  return (
    <IonApp>
      <IonPage>
        <IonContent color="lightbutton">
          <IonHeader class="toolbar">
            <IonToolbar color="theme">
              <IonButton color="theme" href="/profile">
                <IonIcon icon={chevronBackOutline}></IonIcon>
              </IonButton>
              <IonTitle class="title">Edit Account</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonLabel class="label">Change E-mail</IonLabel>

          <IonCard class="card3">
            <IonList>
              <IonItem>
                <IonLabel>Current E-mail</IonLabel>
                {items.map((item) => (
                  <IonLabel class="info">{item.email}</IonLabel>
                ))}
              </IonItem>
              <IonItem>
                <IonLabel>New E-mail</IonLabel>
                <IonInput
                  class="input"
                  value={newEmail}
                  onIonChange={(e) => setNewEmail(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonList>
          </IonCard>
          <IonLabel class="label">Change Password</IonLabel>
          <IonCard>
            <IonList>
              <IonItem>
                <IonLabel>Current Password</IonLabel>
                <IonInput
                  class="input"
                  required
                  type="password"
                  value={currentPassword}
                  onIonChange={(e) => setCurrentPassword(e.detail.value!)}
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel>New Password</IonLabel>
                <IonInput
                  class="input"
                  required
                  type="password"
                  value={newPassword}
                  onIonChange={(e) => setNewPassword(e.detail.value!)}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel>Confirm New Password</IonLabel>
                <IonInput
                  class="input"
                  required
                  type="password"
                  value={newPassword2}
                  onIonChange={(e) => setNewPassword2(e.detail.value!)}
                ></IonInput>
              </IonItem>
              <div className="note">
                * Password must be at least 8 characters
              </div>
            </IonList>
          </IonCard>
          <IonButton
            class="savebutt"
            strong
            id="saveacc"
            size="large"
            color="theme"
            expand="block"
            routerLink={"/Profile"}
            onClick={onHandleSave}
          >
            SAVE
          </IonButton>
          <IonToast
            isOpen={showToast1}
            onDidDismiss={() => setShowToast1(false)}
            message="Your account have been saved."
            duration={200}
            position="middle"
          />
        </IonContent>
      </IonPage>
    </IonApp>
  );
};
export default EditAccount;
