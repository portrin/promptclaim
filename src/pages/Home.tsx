import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonCheckbox,
  IonNote,
  IonLabel,
  IonItem,
  IonBadge,
  IonIcon,
  IonFab,
  IonFabButton,
  IonSearchbar,
  IonButton,
  IonBackButton
} from "@ionic/react";
import { add } from "ionicons/icons";
import { RouteComponentProps } from "react-router-dom";
import React, { useState } from "react";
import "./Home.css";

const Home: React.FC<RouteComponentProps> = props => {
  const [searchText, setSearchText] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonCheckbox slot="start" />
            <IonLabel>
              <h1>Create Idea</h1>
              <IonNote>Run Idea by Brandy</IonNote>
            </IonLabel>
            <IonBadge color="success" slot="end">
              5 Days
            </IonBadge>
          </IonItem>
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => props.history.push("/new")}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonFab vertical="bottom" horizontal="start" slot="fixed">
          <IonFabButton onClick={() => props.history.push("/history")}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonFab vertical="center" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => props.history.push("/myWarranty")}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        <p>Default Searchbar</p>
        <IonSearchbar
          value={searchText}
          onIonChange={e => setSearchText(e.detail.value!)}
        ></IonSearchbar>

        <p>Searchbar with cancel button always shown</p>
        <IonSearchbar
          value={searchText}
          onIonChange={e => setSearchText(e.detail.value!)}
          showCancelButton="always"
        ></IonSearchbar>

        <p>Searchbar with cancel button never shown</p>
        <IonSearchbar
          value={searchText}
          onIonChange={e => setSearchText(e.detail.value!)}
          showCancelButton="never"
        ></IonSearchbar>

        <p>Searchbar with cancel button shown on focus</p>
        <IonSearchbar
          value={searchText}
          onIonChange={e => setSearchText(e.detail.value!)}
          showCancelButton="focus"
        ></IonSearchbar>

        <p>Searchbar with danger color</p>
        <IonSearchbar
          value={searchText}
          onIonChange={e => setSearchText(e.detail.value!)}
          color="danger"
        ></IonSearchbar>

        <p>Searchbar with telephone type</p>
        <IonSearchbar
          value={searchText}
          onIonChange={e => setSearchText(e.detail.value!)}
          type="tel"
        ></IonSearchbar>

        <p>Searchbar with numeric inputmode</p>
        <IonSearchbar
          value={searchText}
          onIonChange={e => setSearchText(e.detail.value!)}
          inputmode="numeric"
        ></IonSearchbar>

        <p>Searchbar disabled </p>
        <IonSearchbar
          value={searchText}
          onIonChange={e => setSearchText(e.detail.value!)}
          disabled={true}
        ></IonSearchbar>

        <p>Searchbar with a cancel button and custom cancel button text</p>
        <IonSearchbar
          value={searchText}
          onIonChange={e => setSearchText(e.detail.value!)}
          showCancelButton="focus"
          cancelButtonText="Custom Cancel"
        ></IonSearchbar>

        <p>
          Searchbar with a custom debounce - Note: debounce only works on
          onIonChange event
        </p>
        <IonSearchbar
          value={searchText}
          onIonChange={e => setSearchText(e.detail.value!)}
          debounce={1000}
        ></IonSearchbar>

        <p>Animated Searchbar</p>
        <IonSearchbar
          value={searchText}
          onIonChange={e => setSearchText(e.detail.value!)}
          animated
        ></IonSearchbar>

        <p>Searchbar with a placeholder</p>
        <IonSearchbar
          value={searchText}
          onIonChange={e => setSearchText(e.detail.value!)}
          placeholder="Filter Schedules"
        ></IonSearchbar>

        <p>Searchbar in a Toolbar</p>
        <IonToolbar>
          <IonSearchbar
            value={searchText}
            onIonChange={e => setSearchText(e.detail.value!)}
          ></IonSearchbar>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default Home;
