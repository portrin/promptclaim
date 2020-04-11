import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Authen from "./pages/Authen";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Verify from "./pages/Verify";
import FillInfo from "./pages/FillInfo";
import Profile from "./pages/Profile";
import editAccount from "./pages/editAccount";
import editProfile from "./pages/editProfile";
import editAddress from "./pages/editAddress";

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

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/authen" component={Authen} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/authen" />} />
        <Route path="/signin" component={SignIn} exact={true} />
        <Route path="/signup" component={SignUp} exact={true} />
        <Route path="/verify" component={Verify} exact={true} />
        <Route path="/fillinfo" component={FillInfo} exact={true} />
        <Route path="/profile" component={Profile} exact={true} />
        <Route path="/editaccount" component={editAccount} exact={true} />
        <Route path="/editprofile" component={editProfile} exact={true} />
        <Route path="/editaddress" component={editAddress} exact={true} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
