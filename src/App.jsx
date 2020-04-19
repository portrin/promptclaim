import React from 'react'
import './App.css'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { MainProductPage } from './pages/main-product-page'
import { ViewProductPage } from './pages/view-product-page'
import { MainPolicyPage } from './pages/main-policy-page'
import { ViewPolicyPage } from './pages/view-policy-page'
import { LoginPage } from './pages/login-page'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={MainProductPage} exact />
        <Route path="/view-product/:key" component={ViewProductPage} exact />
        <Route path="/main-policy" component={MainPolicyPage} exact />
        <Route path="/view-policy/:key" component={ViewPolicyPage} exact />
        <div className="Login-Page">
          <Route path="/login" component={LoginPage} exact />
        </div>
      </Switch>
    </BrowserRouter>
  )
}

export default App
