import React from 'react'
import { Layout, Menu } from 'antd'

const { Sider } = Layout
const { SubMenu } = Menu

export const Sidebar = (props) => {
  return (
    <Sider className="site-layout-background" width={200}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%' }}
      >
        <SubMenu key="sub1" title={<span>View by</span>}>
          <Menu.Item key="1">Product</Menu.Item>
          <Menu.Item
            key="2"
            className="pointer"
            onClick={() => props.history.push('/main-policy')}
          >
            Policy
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
}
