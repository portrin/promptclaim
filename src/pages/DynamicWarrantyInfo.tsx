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
} from "@ionic/react";
import { call, trash, close, closeCircle } from "ionicons/icons";
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
  product_nickname: string;
  uuid: string;
  img: string;
  category_name: string;
  create_timestamp: string;
  serial_no: string;
  supplier_name: string;
  retailer_contact: string;
  supplier_contact: string;
  retailer_branch_name: string;
  product_photo: string;
}
export interface Productprops {
  item: Product;
}
export interface Policy {
  policy_end_date: string;
}
export interface Policyprops {
  item: Policy;
}
const slideOpts = {
  initialSlide: 1,
  speed: 400,
};

const WarrantyInfo: React.FC<Match> = ({ match }) => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showActionSheet1, setShowActionSheet1] = useState(false);
  const [done, setDone] = useState("Edit Warranty");
  const [butStat, setButstat] = useState<boolean>(true);
  const [textColor, setTextColor] = useState("");

  const [showToast1, setShowToast1] = useState(false);
  const [phoneNum, setphoneNum] = useState("");
  const [phoneNumRe, setphoneNumRe] = useState("");
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

  const sendEdit = async () => {
    try {
      const data = await fetch(
        "http://ec2-3-0-20-60.ap-southeast-1.compute.amazonaws.com:8001/customer/product/editbyuuid/" +
          match.params.id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.token,
          },
          body: JSON.stringify({
            serialNo: serial,
            create_t
            imestamp: moment(displayDate).add(1, "days").format(),
          }),
        }
      );
    } catch (error) {
      //
    }
  };
  const fetchPolicy = async () => {
    const data = await fetch(
      "http://ec2-3-0-20-60.ap-southeast-1.compute.amazonaws.com:8001/customer/policy/getByUuid/" +
        match.params.id,
      {
        headers: {
          Authorization: localStorage.token,
        },
      }
    );
    const policy = await data.json();
    setPolicy(policy);

    var dateFormat = policy[0].policy_end_date.split("T")[0];

    function countDay() {
      var today = moment();
      var purchase = moment(dateFormat);
      return purchase.diff(today, "days");
    }
    setRemainingPeriod(countDay() + "");
  };

  const fetchItems = async () => {
    const data = await fetch(
      "http://ec2-3-0-20-60.ap-southeast-1.compute.amazonaws.com:8001/customer/product/getByUuid/" +
        match.params.id,
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
    setphoneNum(item[0].supplier_contact);
    setphoneNumRe(item[0].retailer_contact);

    setdisplayDate(item[0].create_timestamp.split("T")[0]);

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
      "http://ec2-3-0-20-60.ap-southeast-1.compute.amazonaws.com:8001/customer/product/deleteByUuid/" +
        match.params.id,
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
                    <IonCardTitle>{item.product_nickname}</IonCardTitle>
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
                  <IonImg src={item.product_photo}></IonImg>
                ))}
              </IonSlide>
              <IonSlide>
                {item.map((item) => (
                  <IonImg src={item.product_photo}></IonImg>
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
                          window.location.href = "tel:" + phoneNumRe;
                        },
                      },
                    ]}
                  ></IonActionSheet>
                </IonCol>
              </IonRow>

              <IonButton
                expand="block"
                href={`/addClaimDate/${match.params.id}`}
                routerDirection="root"
              >
                Add Claim Date
              </IonButton>
            </IonGrid>
            <IonListHeader>Warranty Information</IonListHeader>

            <IonCard>
              <IonItem>
                <IonLabel
                  color={textColor}
                  position="floating"
                  class="labelwarr"
                >
                  Date of Purchase
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
                <IonLabel position="floating" class="labelwarr">
                  Expiring in
                </IonLabel>
                <IonInput
                  class="ion-no-padding"
                  size={5}
                  required
                  type="text"
                  disabled={true}
                  value={remainingPeriod + " days"}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel
                  color={textColor}
                  class="labelwarr"
                  position="floating"
                >
                  Serial Number
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
                  class="labelwarr"
                  position="floating"
                >
                  Supplier
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
                  class="labelwarr"
                  position="floating"
                >
                  Retailer
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
            </IonCard>

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
