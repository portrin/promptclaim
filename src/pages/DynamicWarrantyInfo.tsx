import React, { useState, useEffect } from "react";
import { RefresherEventDetail } from "@ionic/core";
import moment from 'moment';
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

interface RouteParam {
  id: string;
}
interface Match extends RouteComponentProps<RouteParam> {
  params: string;
  //ไม่จำเปน
}
export interface Product {
  product_name: string;
  uuid: string;
  img: string;
  category_name: string;
  create_timestamp: string;
  serial_no: string;
  supplier_name: string;
  contact: string;
  retailer_branch_name: string;
}
export interface Productprops {
  item: Product;
}
const slideOpts = {
  initialSlide: 1,
  speed: 400,
};

const WarrantyInfo: React.FC<Match> = ({ match }) => {
  const [checked, setChecked] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showActionSheet1, setShowActionSheet1] = useState(false);

  const [showToast1, setShowToast1] = useState(false);
  const [phoneNum, setphoneNum] = useState("");
  const [remainingPeriod, setRemainingPeriod] = useState("");
  const [displayDate, setdisplayDate] = useState("");
  console.log(match);
  console.log(match.params);
  console.log(match.params.id);
  useEffect(() => {
    fetchItems();
  }, []);
  const [item, setItem] = useState<Product[]>([]);
  
  const fetchItems = async () => {
    const data = await fetch(
      "http://localhost:8001/customer/product//getByUuid/" + match.params.id,
      {
        headers: {
          Authorization: localStorage.token,
        },
      }
    );
    console.log(data);
    const item = await data.json();
    setItem(item);
    console.log(item);
    setphoneNum(item[0].contact);
    var dateFormat = item[0].create_timestamp.split('T')[0];
    setdisplayDate(item[0].create_timestamp.split('T')[0]);
    console.log(dateFormat) 
    console.log("Days =") 
    function countDay() {
      var today = moment(); 
      var purchase = moment(dateFormat); 
      return today.diff(purchase, 'days')
    }
    console.log(countDay()) 
    setRemainingPeriod(countDay()+"")
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
                    <IonCardTitle>{item.product_name}</IonCardTitle>
                  ))}
                  {item.map((item) => (
                    <IonCardSubtitle>{item.category_name}</IonCardSubtitle>
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
            <IonSlides pager={true} options={slideOpts}>
              <IonSlide>
                {item.map((item) => (
                  <IonImg src={item.img}></IonImg>
                ))}
              </IonSlide>
              <IonSlide>
                {item.map((item) => (
                  <IonImg src={item.img}></IonImg>
                ))}
              </IonSlide>{" "}
              <IonSlide>
                {item.map((item) => (
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
                          window.location.href = "tel:" + phoneNum;
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
                {item.map((item) => (
                  <h3>{displayDate}</h3>
                ))}
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
                <h2>Days Since Purchased</h2>
                {item.map((item) => (
                  <h3>{remainingPeriod}</h3>
                ))}
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h2>Serial Number</h2>
                {item.map((item) => (
                  <h3>{item.serial_no}</h3>
                ))}
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
                <h2>Supplier</h2>
                {item.map((item) => (
                  <h3>{item.supplier_name}</h3>
                ))}
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
                {item.map((item) => (
                  <h3>{item.retailer_branch_name}</h3>
                ))}
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
