import React from 'react'
import { Layout, Breadcrumb, Menu, Table } from 'antd'

export const MainPolicyPage = (props) => {
  return (
    <div className="App">
      <Layout>
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
        <Layout>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Policy Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            <Layout
              className="site-layout-background"
              style={{ padding: '24px 0' }}
            >
              <Sider className="site-layout-background" width={200}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%' }}
                >
                  <SubMenu key="sub1" title={<span>View by</span>}>
                    <Menu.Item
                      key="2"
                      className="pointer"
                      onClick={() => props.history.push('/')}
                    >
                      Product
                    </Menu.Item>
                    <Menu.Item key="1">Policy</Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Content>
                <div className="site-layout-content">
                  <Table
                    columns={columns}
                    dataSource={data}
                    onChange={onChange}
                  />
                </div>
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Prompt Claim ©2020 Created by Team Igloo
          </Footer>
        </Layout>
      </Layout>
    </div>
  )
}

const { SubMenu } = Menu

const { Header, Content, Footer, Sider } = Layout

const columns = [
  {
    title: 'Policy ID',
    dataIndex: 'policy',
    sorter: (a, b) => a.policy - b.policy,
  },
  {
    title: 'Number of Product Type',
    dataIndex: 'type',
    sorter: (a, b) => a.type - b.type,
  },
  {
    title: 'Total Number of Product',
    dataIndex: 'num',
    sorter: (a, b) => a.num - b.num,
  },
  {
    title: 'Policy Owner',
    dataIndex: 'owner',
    sorter: (a, b) => a.owner.length - b.owner.length,
  },
]

const data = [
  {
    key: '1',
    policy: '000037',
    type: '4',
    num: '30',
    owner: 'Boonthavorn',
  },
  {
    key: '2',
    policy: '000392',
    type: '5',
    num: '24',
    owner: 'COTTO',
  },
  {
    key: '3',
    policy: '002043',
    type: '6',
    num: '43',
    owner: 'Boonthavorn',
  },
  {
    key: '4',
    policy: '000674',
    type: '2',
    num: '10',
    owner: 'DAIKIN',
  },
]

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra)
}
