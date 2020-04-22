import React from 'react'
import { Layout, Menu, Dropdown } from 'antd'

import userlogo from '../photo/user.png'
import logo from '../photo/logo.png'

const { Header } = Layout

export const Topbar = () => {
  return (
    <Header className="header">
      <Dropdown className="pointer" overlay={menu} trigger={['click']}>
        <img
          className="user"
          src={userlogo}
          alt="user logo"
          style={{ float: 'right' }}
        />
      </Dropdown>

      <img
        className="logo"
        src={logo}
        alt="prompt claim logo"
        style={{ float: 'left' }}
      />
    </Header>
  )
}
const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2" onClick={() => localStorage.clear()}>
      <a href="/login">LogOut</a>
    </Menu.Item>
  </Menu>
)
