import React from 'react'
import './App.css'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import { MainProductPage } from './pages/main-product-page'
import { ViewProductPage } from './pages/view-product-page'
import { MainPolicyPage } from './pages/main-policy-page'
import { ViewPolicyPage } from './pages/view-policy-page'
import { LoginPage } from './pages/login-page'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/main-product" component={MainProductPage} exact />
        <Route path="/view-product/:key" component={ViewProductPage} exact />
        <Route path="/main-policy" component={MainPolicyPage} exact />
        <Route path="/view-policy/:key" component={ViewPolicyPage} exact />
        <Route path="/login" component={LoginPage} exact />
      </Switch>
    </BrowserRouter>
  )
}

export default App
