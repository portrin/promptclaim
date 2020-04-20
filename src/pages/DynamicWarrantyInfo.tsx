import React, { useState, useEffect } from "react";
import { RefresherEventDetail } from "@ionic/core";
import moment from "moment";
import "./DynamicWarrantyInfo.css";

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
  IonInput,
  IonDatetime,
  IonRouterLink,
} from "@ionic/react";
import {
  notifications,
  call,
  trash,
  close,
  closeCircle,
  today,
} from "ionicons/icons";
import "./WarrantyInfo.css";
import { RouteComponentProps } from "react-router-dom";
import { triggerAsyncId } from "async_hooks";

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
export interface Policy {
  item: Policy;
}
export interface Policyprops {
  item: Policy;
}
const slideOpts = {
  initialSlide: 1,
  speed: 400,
};

const WarrantyInfo: React.FC<Match> = ({ match }) => {
  const [checked, setChecked] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showActionSheet1, setShowActionSheet1] = useState(false);
  const [done, setDone] = useState("Edit Warranty");
  const [fill, setFill] = useState("outline");
  const [butStat, setButstat] = useState<boolean>(true);
  const [textColor, setTextColor] = useState("");

  const [showToast1, setShowToast1] = useState(false);
  const [phoneNum, setphoneNum] = useState("");
  const [remainingPeriod, setRemainingPeriod] = useState("");
  const [displayDate, setdisplayDate] = useState("");
  const [serial, setSerial] = useState("");
  const [retailer, setRetailer] = useState<string>();
  const [supplier, setSupplier] = useState<string>();
  const [item, setItem] = useState<Product[]>([]);
  const [policy, setPolicy] = useState<Policy[]>([]);
  const [todayD, setTodayD] = useState<string>(new Date().toISOString());
  useEffect(() => {
    fetchItems();
    fetchPolicy();
  }, []);

  const trigger = () => {
    if (butStat === true) {
      setButstat(false);
      setDone("Done");
      setTextColor("primary");
    } else {
      setButstat(true);
      setDone("Edit Warranty");
      sendEdit();
      setTextColor("");
    }
  };
  console.log(displayDate);

  const sendEdit = async () => {
    try {
      const data = await fetch(
        "http://localhost:8001/customer/product/editbyuuid/" + match.params.id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.token,
          },
          body: JSON.stringify({
            serialNo: serial,
            createTimestamp: moment(displayDate).add(1, "days").format(),
          }),
        }
      );
    } catch (error) {
      //
    }
  };
  console.log(moment(displayDate).add(1, "days").format());
  const fetchPolicy = async () => {
    const data = await fetch(
      "http://localhost:8001/customer/policy/getByUuid/" + match.params.id,
      {
        headers: {
          Authorization: localStorage.token,
        },
      }
    );
    const policy = await data.json();
    setPolicy(policy);
    console.log(policy);
  };

  const fetchItems = async () => {
    const data = await fetch(
      "http://localhost:8001/customer/product/getByUuid/" + match.params.id,
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
    setSerial(item[0].serial_no);
    setSupplier(item[0].supplier_name);
    setRetailer(item[0].retailer_branch_name);
    setphoneNum(item[0].contact);
    var dateFormat = item[0].create_timestamp.split("T")[0];
    setdisplayDate(item[0].create_timestamp.split("T")[0]);
    console.log(dateFormat);
    console.log("Days =");
    function countDay() {
      var today = moment();
      var purchase = moment(dateFormat);
      return today.diff(purchase, "days");
    }
    console.log(countDay());
    setRemainingPeriod(countDay() + "");
    setTodayD(todayD.split("T")[0]);
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

  const removeProduct = async () => {
    const data = await fetch(
      "http://localhost:8001/customer/product/deleteByUuid/" + match.params.id,
      {
        method: "DELETE",

        headers: {
          Authorization: localStorage.token,
        },
      }
    );
    window.location.href = "/mywarranty";
    fetchItems();
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
              </IonRow>
              <IonButton
                expand="block"
                fill="outline"
                href="http://www.instagram.com/somd99"
              >
                View Policy
              </IonButton>

              <IonButton
                expand="block"
                routerLink={`/addClaimDate/${match.params.id}`}
              >
                Add Claim Date
              </IonButton>
            </IonGrid>
            <IonListHeader>Warranty Information</IonListHeader>

            <IonItem>
              <IonLabel color={textColor} position="floating">
                <h1>Date of Purchase</h1>
              </IonLabel>
              <IonDatetime
                displayFormat="DDDD MMM D, YYYY"
                min="2020"
                max={todayD}
                disabled={butStat}
                value={displayDate}
                onIonChange={(e) => setdisplayDate(e.detail.value!)}
              ></IonDatetime>
            </IonItem>

            <IonItem>
              <IonLabel class="ion-no-padding" position="floating">
                <h1>Days Since Purchased</h1>
              </IonLabel>
              <IonInput
                class="ion-no-padding"
                size={5}
                required
                type="text"
                disabled={true}
                value={remainingPeriod}
                onIonChange={(e) => setRemainingPeriod(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel
                color={textColor}
                class="ion-no-padding"
                position="floating"
              >
                <h1> Serial Number</h1>
              </IonLabel>
              <IonInput
                class="ion-no-padding"
                size={5}
                required
                type="text"
                disabled={butStat}
                value={serial}
                onIonChange={(e) => setSerial(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel
                color={textColor}
                class="ion-no-padding"
                position="floating"
              >
                <h1> Supplier</h1>
              </IonLabel>
              <IonInput
                class="ion-no-padding"
                size={5}
                placeholder="-"
                required
                type="text"
                disabled={butStat}
                value={supplier}
                onIonChange={(e) => setSupplier(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel
                color={textColor}
                class="ion-no-padding"
                position="floating"
              >
                <h1> Retailer</h1>
              </IonLabel>
              <IonInput
                class="ion-no-padding"
                placeholder="-"
                size={5}
                required
                type="text"
                disabled={butStat}
                value={retailer}
                onIonChange={(e) => setRetailer(e.detail.value!)}
              ></IonInput>
            </IonItem>

            <IonButton color="primary" expand="block" onClick={() => trigger()}>
              {done}
            </IonButton>
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
                  role: "destructive",
                  handler: () => {
                    removeProduct();
                    console.log("Removed");
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
