import React from 'react'
import { useParams } from 'react-router-dom'
import { Layout, Breadcrumb, Menu, Descriptions } from 'antd'

const { SubMenu } = Menu

const data = {
  '1': {
    key: '1',

    image: '/cotto-toilet-bowl.jpg',

    product_name: 'COTTO Automatic Toilet Bowl',
  },
  '2': {
    key: '2',

    image: '/ame-toilet.jpg',

    product_name: 'AMERICAN STANDARD Toilet Bowl',
  },
  '3': {
    key: '3',

    image: '/water-heater.jpg',

    product_name: 'STIEBEL ELTRON Water Heater',
  },
  '4': {
    key: '4',

    image: '/air.jpg',

    product_name: 'DAIKIN Air Conditioner',
  },
}

export const ViewProductPage = (props) => {
  let { key } = useParams()
  return (
    <div className="App">
      <Layout>
        <Header className="header">
          <img
            className="user"
            src="/user.png"
            alt="user logo"
            style={{ float: 'right' }}
          />
          <img
            className="logo"
            src="/logo.png"
            alt="prompt claim logo"
            style={{ float: 'left' }}
          />
        </Header>
        <Layout>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item
                className="pointer"
                onClick={() => props.history.push('/')}
              >
                Product Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item>Product Information</Breadcrumb.Item>
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
                    <Menu.Item key="1">Product</Menu.Item>
                    <Menu.Item key="2">Policy</Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Content>
                <div className="site-layout-content">
                  <Descriptions
                    title={data[key].product_name}
                    layout="vertical"
                    bordered
                    column={2}
                  >
                    <Descriptions.Item label="Product Image">
                      <img
                        className="toilet"
                        src={data[key].image}
                        alt="toilet bowl"
                      />
                    </Descriptions.Item>
                    <Descriptions.Item label="Product Information">
                      Purchase date: 20/03/2019
                      <br />
                      Serial Number: 000001
                      <br />
                      warranty Number: 000001
                      <br />
                      Supplier ID: 000001
                      <br />
                      Retailer ID: 000001
                    </Descriptions.Item>
                    <Descriptions.Item label="Customer Information">
                      Customer ID: 123000
                      <br />
                      Customer Name: Sarut Sakulwira
                      <br />
                      Phone Number: 087-330-9493
                      <br />
                      Birth Date: 08/07/1999
                      <br />
                      Address: 35 Soi Chotiwat 10,
                      <br />
                      Rimklong Prapa Rd., Bangsue,
                      <br />
                      Bangkok, Thailand, 10800
                    </Descriptions.Item>
                    <Descriptions.Item label="Claim Information">
                      Expiry date: 20/20/2020
                      <br />
                      Claim Period: 2 years
                      <br />
                      Claim Period Left: 1 years
                      <br />
                      Status: Unclaim
                    </Descriptions.Item>
                  </Descriptions>
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

const { Header, Content, Footer, Sider } = Layout
