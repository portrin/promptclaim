import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonButton,
  IonLabel,
  IonDatetime,
  IonToast,
  IonSelectOption,
  IonSelect
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import moment from "moment";
import { filter } from "ionicons/icons";

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
  claim_log_timestamp: string;
}
export interface Policy {
  policy_id: string;
  uuid: string;
  policy_start_date: string;
  policy_end_date: string;
  policy_timestamp: string;
}
export interface PGet {
  policy_id: string;
  policy_description: string;
}
export interface Productprops {
  item: Product;
}

const AddPolicy: React.FC<Match> = ({ match }) => {
  console.log(match);
  const [showToast1, setShowToast1] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString()
  );
  const [todayD, setTodayD] = useState<string>(new Date().toISOString());
  useEffect(() => {
    fetchItems();
  }, []);
  const [item, setItem] = useState<PGet[]>([]);
  const [uuid, setuuid] = useState<string>();
  const [startD, setStartD] = useState<string>(new Date().toISOString());
  const [endD, setendD] = useState<string>(new Date().toISOString());
  const [polid, setPolid] = useState<string>();
  const [dylink, setDyLink] = useState("/myWarranty/" + match.params.id);

  const fetchItems = async () => {
    const data = await fetch(
      "http://ec2-3-0-20-60.ap-southeast-1.compute.amazonaws.com:8001/customer/policy/getAllPolicy/",
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
    setDyLink("/myWarranty/" + match.params.id);
    setTodayD(moment(todayD).add(0, "days").format());
    
  };

  const addPolicy = async () => {
    console.log(polid);
    const data = await fetch(
      
      "http://ec2-3-0-20-60.ap-southeast-1.compute.amazonaws.com:8001/customer/policy/addPolicyToProduct/" +
        match.params.id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token,
        },
        body: JSON.stringify({
          policyId: polid,
          uuid: match.params.id,
          policyStartDate: startD,
          policyEndDate: endD,
          policyTimestamp: moment()+"",
        }),
      }
    );
    
    fetchItems()
    console.log(data);
    if (data.status === 200) {
      setShowToast1(true);
    }
    window.location.href = `/mywarranty/${match.params.id}` 
  };

function filterID2(name: string) {
  const item3 = new Array<PGet>();
  for (var i =0; i<item.length;i++) {
    if (item[i].policy_description==name) {
      item3.push(item[i])
      setPolid(item3[0].policy_id)
    }
  }
  
}
   
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Add Policy</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader></IonListHeader>
          <IonItem>
                <IonLabel
                  color="primary"
                  position="floating"
                  class="labelwarr"
                >
                  Warranty Start Date
                </IonLabel>
                <IonDatetime
                  displayFormat="DDDD MMM D, YYYY"
                  min="2020"
                  max={todayD}
                  
                  value={startD}
                  onIonChange={(e) => setStartD(e.detail.value!)}
                ></IonDatetime>
              </IonItem>
              <IonItem>
                <IonLabel
                  color="primary"
                  position="floating"
                  class="labelwarr"
                >
                  Warranty End Date
                </IonLabel>
                <IonDatetime
                  displayFormat="DDDD MMM D, YYYY"
                  min="2020"
                  max="2099"
                  value={endD}
                  onIonChange={(e) => setendD(e.detail.value!)}
                ></IonDatetime>
              </IonItem>

              <IonItem>
            
            <IonLabel position="floating" color="primary">
              Policy ID
            </IonLabel>
            <IonSelect value={polid} onIonChange={(e) => filterID2(e.detail.value!)}>
            {item.map((item) => ( 
              <IonSelectOption value={item.policy_description}>
                {item.policy_description}
            
              </IonSelectOption>
            ))}
            </IonSelect>
          </IonItem>
          <IonButton expand="block" onClick={addPolicy} 
         
          routerDirection="root">
            Add
          </IonButton>
          <IonButton
            color="light"
            expand="block"
            href= {`/myWarranty/${match.params.id}` }
            routerDirection="root"
          >
            Back
          </IonButton>
        </IonList>
        <IonToast
          position="bottom"
          color="primary"
          isOpen={showToast1}
          onDidDismiss={() => setShowToast1(false)}
          message="Log Update"
          duration={2000}
          
        />
      </IonContent>
    </IonPage>
  );
};

export default AddPolicy;
