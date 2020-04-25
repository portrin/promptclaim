import React from 'react'
import { Layout, Breadcrumb, Row, Col } from 'antd'
import { Topbar } from '../components/header'
import { Bottombar } from '../components/footer'
import { Sidebar } from '../components/sider'
const { Content } = Layout

export const AppLayout = (props) => {
  return (
    <Layout>
      <Topbar />
      <Layout>
        <Content>
          <br />
          <Row>
            <Col span={8}></Col>
            <Col span={8}>{props.nosearch}</Col>
            <Col span={8}></Col>
          </Row>
        </Content>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item
              className="pointer"
              onClick={() => props.history.push(`/main-product`)}
            >
              {props.lastpageProduct}
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="pointer"
              onClick={() => props.history.push('/main-policy')}
            >
              {props.lastpagePolicy}
            </Breadcrumb.Item>
            <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            className="site-layout-background"
            style={{ padding: '24px 0' }}
          >
            <Sidebar {...props} />
            <Content>{props.children}</Content>
          </Layout>
        </Content>
        <Bottombar />
      </Layout>
    </Layout>
  )
}
