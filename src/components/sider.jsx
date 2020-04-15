import React from 'react'
import { Layout, Menu } from 'antd'

const { Sider } = Layout
const { SubMenu } = Menu

export const Sidebar = (props) => {
  console.log(props.history)
  const path = props.history.location.pathname
  return (
    <Sider className="site-layout-background" width={200}>
      <Menu
        mode="inline"
        defaultSelectedKeys={path === '/' ? 'product' : 'policy'}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%' }}
      >
        <SubMenu key="sub1" title={<span>View by</span>}>
          <Menu.Item key="product" onClick={() => props.history.push('/')}>
            Product
          </Menu.Item>
          <Menu.Item
            key="policy"
            onClick={() => props.history.push('/main-policy')}
          >
            Policy
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
}
