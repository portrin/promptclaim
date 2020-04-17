import React, { useState, useEffect } from "react";
import { RefresherEventDetail } from "@ionic/core";
import {
  IonRefresherContent,
  IonRefresher,
  IonToast,
  IonInfiniteScroll,
  IonImg,
  IonActionSheet,
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonToggle,
  IonListHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonSlides,
  IonSlide,
} from "@ionic/react";
import { notifications, call, trash, close, closeCircle } from "ionicons/icons";
import "./WarrantyInfo.css";
import { RouteComponentProps } from "react-router-dom";
export interface Character {
  name: string;
  char_id: string;
  img: string;
  status: string;
}
export interface Itemprops {
  item: Character;
}

interface RouteParam {
  id: string;
}
interface Match extends RouteComponentProps<RouteParam> {
  params: string;
  //ไม่จำเปน
}

const WarrantyInfo: React.FC<Match> = ({ match }) => {
  const [checked, setChecked] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showActionSheet1, setShowActionSheet1] = useState(false);

  const [showToast1, setShowToast1] = useState(false);
  console.log(match);
  console.log(match.params);
  console.log(match.params.id);
  useEffect(() => {
    fetchItems();
  }, []);
  const [item, setItem] = useState<Character[]>([]);
  const fetchItems = async () => {
    const data = await fetch(
      "https://www.breakingbadapi.com/api/characters/" + match.params.id
    );

    const item = await data.json();
    setItem(item);
    console.log(item);
  };

  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      event.detail.complete();
    }, 2000);
  }

  type Item = {
    src: string;
    text: string;
  };

  return (
    <IonPage>
      <IonContent>
        <IonInfiniteScroll>
          <IonCard color="light">
            <IonRow>
              <IonCol>
                <IonCardHeader>
                  {item.map((item) => (
                    <IonCardTitle>{item.name}</IonCardTitle>
                  ))}
                  {item.map((item) => (
                    <IonCardSubtitle>{item.status}</IonCardSubtitle>
                  ))}
                  
                </IonCardHeader>
              </IonCol>
              <IonCol>
                <IonButton
                  class="ion-float-right"
                  size="small"
                  fill="clear"
                  routerLink="/myWarranty"
                  routerDirection="root"
                >
                  <IonIcon size="large" icon={closeCircle}></IonIcon>
                </IonButton>
              </IonCol>
            </IonRow>
            <IonSlides> 
              <IonSlide>{item.map((item) => (
                    <IonImg src={item.img}></IonImg>
                  ))}
              </IonSlide>
              <IonSlide>{item.map((item) => (
                    <IonImg src={item.img}></IonImg>
                  ))}
              </IonSlide> <IonSlide>{item.map((item) => (
                    <IonImg src={item.img}></IonImg>
                  ))}
              </IonSlide>
            </IonSlides>
           

            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton
                    fill="outline"
                    size="large"
                    expand="block"
                    onClick={() => setShowActionSheet(true)}
                  >
                    <IonIcon icon={call}></IonIcon>
                  </IonButton>
                  <IonActionSheet
                    isOpen={showActionSheet}
                    onDidDismiss={() => setShowActionSheet(false)}
                    buttons={[
                      {
                        text: "Cancel",
                        icon: close,
                        role: "cancel",
                        handler: () => {
                          console.log("Cancel clicked");
                        },
                      },
                      {
                        text: "Contact Supplier",
                        icon: call,
                        handler: () => {
                          window.location.href = "tel:0895511663";
                        },
                      },

                      {
                        text: "Contact Retailer",
                        icon: call,
                        handler: () => {
                          console.log("Contact Re clicked");
                        },
                      },
                    ]}
                  ></IonActionSheet>
                </IonCol>
                <IonCol>
                  <IonButton fill="outline" size="large" expand="block">
                    <IonIcon icon={notifications}></IonIcon>
                    <IonToggle
                      onClick={() => setShowToast1(true)}
                      color="success"
                      checked={checked}
                      onIonChange={(e) => setChecked(e.detail.checked)}
                    />
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonButton
                expand="block"
                fill="outline"
                href="http://www.instagram.com/somd99"
              >
                View Policy
              </IonButton>

              <IonButton expand="block" routerLink="/addClaimDate">
                Add Claim Date
              </IonButton>
            </IonGrid>

            <IonListHeader>Warranty Information</IonListHeader>
            <IonItem>
              <IonLabel>
                <h2>Purchase Date</h2>
                <h3>15 March 2020</h3>
              </IonLabel>
              <IonButton
                slot="end"
                color="medium"
                fill="outline"
                expand="block"
              >
                Edit
              </IonButton>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h2>Serial Number</h2>
                <h3>26EEEDOD</h3>
              </IonLabel>
              <IonButton
                slot="end"
                color="medium"
                fill="outline"
                expand="block"
              >
                Edit
              </IonButton>
            </IonItem>
            <IonItem>
              <IonLabel>
                <h2>Warranty Number</h2>
                <h3>000000286</h3>
              </IonLabel>
              <IonButton
                slot="end"
                color="medium"
                fill="outline"
                expand="block"
              >
                Edit
              </IonButton>
            </IonItem>
            <IonItem>
              <IonLabel>
                <h2>Retailer</h2>
                <h3>IKEA id:0261</h3>
              </IonLabel>
              <IonButton
                slot="end"
                color="medium"
                fill="outline"
                expand="block"
              >
                Edit
              </IonButton>
            </IonItem>
            <IonItem>
              <IonLabel>
                <h2>Remaining Warranty Period</h2>
                <h3>327 days</h3>
              </IonLabel>
              <IonButton
                slot="end"
                color="medium"
                fill="outline"
                expand="block"
              >
                Edit
              </IonButton>
            </IonItem>
            <IonItem>
              <br></br>
            </IonItem>

            <IonButton
              color="danger"
              onClick={() => setShowActionSheet1(true)}
              expand="block"
            >
              <IonIcon icon={trash} item-left></IonIcon>Remove Warranty
            </IonButton>
            <IonActionSheet
              isOpen={showActionSheet1}
              onDidDismiss={() => setShowActionSheet1(false)}
              buttons={[
                {
                  text: "Cancel",
                  icon: close,
                  role: "cancel",
                  handler: () => {
                    console.log("Contact Re clicked");
                  },
                },
                {
                  text: "Remove Warranty",
                  icon: trash,
                  handler: () => {
                    console.log("Contact Re clicked");
                  },
                },
              ]}
            ></IonActionSheet>
            <IonToast
              position="bottom"
              color="primary"
              isOpen={showToast1}
              onDidDismiss={() => setShowToast1(false)}
              message=" You will be noitified 3 days before the period ends"
              duration={1000}
            />
          </IonCard>
        </IonInfiniteScroll>
        <IonRefresher
          slot="fixed"
          onIonRefresh={doRefresh}
          pullFactor={1}
          pullMin={100}
          pullMax={200}
        >
          <IonRefresherContent
            pullingIcon="arrow-dropdown"
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing..."
          ></IonRefresherContent>
        </IonRefresher>
      </IonContent>
    </IonPage>
  );
};

export default WarrantyInfo;
