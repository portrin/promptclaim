import React from 'react'
import { Layout, Breadcrumb, Menu, Descriptions, Collapse } from 'antd'

import { Topbar } from '../components/header'
import { Bottombar } from '../components/footer'

const { SubMenu } = Menu

const { Panel } = Collapse

function callback(key) {
  console.log(key)
}

const text = `
RETURN – EXCHANGE POLICIES

Terms & Conditions:
1. Product must not be damaged by customers action or has been installed.
2. The return/exchange policies are eligible with product purchased through Boonthavorn Online Store only.
3. Product must be unused, the product brand or price tag must be intact and the product's box or package must be in the complete condition, warranty document, manual and compatible equipment of the product.
4. Product provided under the condition of promotion such as premium, giveaways, etc. must be returned with the main product(s).
5. If you want to change “Lifestyle” furniture and the product(s) that has been installed or the problem isn’t caused by product itself, the company reserves the rights of any exchanges.
`

export const ViewPolicyPage = (props) => {
  return (
    <div className="App">
      <Layout>
        <Topbar />
        <Layout>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item
                className="pointer"
                onClick={() => props.history.push('/main-policy')}
              >
                Policy Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item>Policy Information</Breadcrumb.Item>
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
                  <Descriptions layout="vertical" bordered>
                    <Descriptions.Item label="Policy Informaion">
                      Policy ID: 000037
                      <br />
                      <Collapse>
                        <Panel header="Policy Description">
                          <p>{text}</p>
                        </Panel>
                      </Collapse>
                    </Descriptions.Item>
                  </Descriptions>
                  <Descriptions layout="vertical" bordered>
                    <Descriptions.Item label="Product Information">
                      <Collapse onChange={callback}>
                        <Panel
                          header="AMERICAN STANDARD Automatic Toilet Bowl"
                          key="1"
                        >
                          <Collapse>
                            <Panel header="Customer 1" key="1">
                              Customer ID: 000293
                              <br />
                              Product Number: 000001
                              <br />
                              Serial Number: 000056
                              <br />
                              Policy Period: 10/3/20 to 10/3/22
                            </Panel>
                            <Panel header="Customer 2" key="2">
                              Customer ID: 000353
                              <br />
                              Product Number: 000005
                              <br />
                              Serial Number: 000012
                              <br />
                              Policy Period: 14/4/19 to 14/4/21
                            </Panel>
                            <Panel header="Customer 3" key="3">
                              Customer ID: 000353
                              <br />
                              Product Number: 000005
                              <br />
                              Serial Number: 000012
                              <br />
                              Policy Period: 14/4/19 to 14/4/21
                            </Panel>
                          </Collapse>
                        </Panel>
                        <Panel header="AMERICAN STANDARD Toilet Bowl" key="2">
                          <Collapse>
                            <Panel header="Customer 1" key="1">
                              Customer ID: 000293
                              <br />
                              Product Number: 000001
                              <br />
                              Serial Number: 000056
                              <br />
                              Policy Period: 10/3/20 to 10/3/22
                            </Panel>
                            <Panel header="Customer 2" key="2">
                              Customer ID: 000353
                              <br />
                              Product Number: 000005
                              <br />
                              Serial Number: 000012
                              <br />
                              Policy Period: 14/4/19 to 14/4/21
                            </Panel>
                            <Panel header="Customer 3" key="3">
                              Customer ID: 000353
                              <br />
                              Product Number: 000005
                              <br />
                              Serial Number: 000012
                              <br />
                              Policy Period: 14/4/19 to 14/4/21
                            </Panel>
                          </Collapse>
                        </Panel>
                        <Panel header="AMERICAN STANDARD Water Heater" key="3">
                          <Collapse>
                            <Panel header="Customer 1" key="1">
                              Customer ID: 000293
                              <br />
                              Product Number: 000001
                              <br />
                              Serial Number: 000056
                              <br />
                              Policy Period: 10/3/20 to 10/3/22
                            </Panel>
                            <Panel header="Customer 2" key="2">
                              Customer ID: 000353
                              <br />
                              Product Number: 000005
                              <br />
                              Serial Number: 000012
                              <br />
                              Policy Period: 14/4/19 to 14/4/21
                            </Panel>
                            <Panel header="Customer 3" key="3">
                              Customer ID: 000353
                              <br />
                              Product Number: 000005
                              <br />
                              Serial Number: 000012
                              <br />
                              Policy Period: 14/4/19 to 14/4/21
                            </Panel>
                          </Collapse>
                        </Panel>
                      </Collapse>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              </Content>
            </Layout>
          </Content>
          <Bottombar />
        </Layout>
      </Layout>
    </div>
  )
}

const { Content, Sider } = Layout
