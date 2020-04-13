import React from 'react'
import { Layout } from 'antd'

const { Header } = Layout

export const Topbar = () => {
  return (
    <Header className="header">
      <img
        className="user"
        src="user.png"
        alt="user logo"
        style={{ float: 'right' }}
      />
      <img
        className="logo"
        src="logo.png"
        alt="prompt claim logo"
        style={{ float: 'left' }}
      />
    </Header>
  )
}
