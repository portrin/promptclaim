import React from 'react'
import { Layout, Menu } from 'antd'

const { Sider } = Layout
const { SubMenu } = Menu

export const Sidebar = (props) => {
  const path = props.history.location.pathname
  console.log(props.history)
  return (
    <Sider className="site-layout-background" width={200}>
      <Menu
        mode="inline"
        defaultSelectedKeys={
          (path === '/') ? 'product':
          (path ==='/view-product') ? 'product':
          (path ==='/main-policy') ? 'policy':
          (path ==='/view-policy') ? 'policy':
          'product'
        }
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
