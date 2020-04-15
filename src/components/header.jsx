import React from 'react'
import { Layout } from 'antd'
import userlogo from '../photo/user.png'
import logo from '../photo/logo.png'

const { Header } = Layout

export const Topbar = () => {
  return (
    <Header className="header">
      <img
        className="user"
        src={userlogo}
        alt="user logo"
        style={{ float: 'right' }}
      />
      <img
        className="logo"
        src={logo}
        alt="prompt claim logo"
        style={{ float: 'left' }}
      />
    </Header>
  )
}
