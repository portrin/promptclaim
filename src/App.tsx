import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import HistoryPage from "./pages/history";
import MyWarranty from "./pages/MyWarranty";
import AddWarranty from "./pages/AddWarranty";
import DynamicWarrantyInfo from "./pages/DynamicWarrantyInfo";
import Notification from "./pages/Notification";
import AddClaimDate from "./pages/AddClaimDate";
import AddPolicy from "./pages/AddPolicy"; 

import Authen from "./pages/Authen";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Verify from "./pages/Verify";
import FillInfo from "./pages/FillInfo";
import Profile from "./pages/Profile";
import EditAccount from "./pages/EditAccount";
import EditProfile from "./pages/EditProfile";
import EditAddress from "./pages/EditAddress";


/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/myWarranty" component={MyWarranty} exact={true} />
          <Route path="/history" component={HistoryPage} />
          <Route path="/addWarranty" component={AddWarranty} />
          <Route path="/myWarranty/:id" component={DynamicWarrantyInfo} />
          <Route path="/notification" component={Notification} />
          <Route path="/AddClaimDate" exact={true} component={AddClaimDate} />
          <Route path="/AddClaimDate/:id" component={AddClaimDate} />
          <Route path="/AddPolicy/:id" component={AddPolicy} /> 
 
          <Route path="/authen" component={Authen} exact={true} />
          <Route exact path="/" render={() => <Redirect to="/authen" />} />
          <Route path="/signin" component={SignIn} exact={true} />
          <Route path="/signup" component={SignUp} exact={true} />
          <Route path="/verify" component={Verify} exact={true} />
          <Route path="/fillinfo" component={FillInfo} exact={true} />
          <Route path="/profile" component={Profile} exact={true} />

          <Route path="/editaccount" component={EditAccount} exact={true} />
          <Route path="/editprofile" component={EditProfile} exact={true} />
          <Route path="/editaddress" component={EditAddress} exact={true} />

          <Route path="/editaccount/:id" component={EditAccount} />
          <Route path="/editprofile/:id" component={EditProfile} />
          <Route path="/editaddress/:id" component={EditAddress} />

          <Route
            exact={true}
            path="/"
            render={() => <Redirect to="/authen" />}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
// <Redirect exact from="/" to="/home" />
