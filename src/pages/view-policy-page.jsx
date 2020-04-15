import React from 'react'
import { Descriptions, Collapse } from 'antd'
import { AppLayout } from '../components/app-layout'
import { useParams } from 'react-router-dom'

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
  let { key } = useParams()
  return (
    <AppLayout {...props} nosearch title="Product Information">
      <div className="site-layout-content">
        <Descriptions layout="vertical" bordered>
          <Descriptions.Item label="Policy Informaion">
            Policy ID: {data[key].policyID}
            <br />
            <Collapse>
              <Panel header="Policy Description">{data[key].policyDes}</Panel>
            </Collapse>
          </Descriptions.Item>
        </Descriptions>
        <Descriptions layout="vertical" bordered>
          <Descriptions.Item label="Product Information">
            <Collapse onChange={callback}>
              <Panel header="AMERICAN STANDARD Automatic Toilet Bowl" key="1">
                <Collapse>
                  <Panel header="Customer 1" key="1">
                    Customer ID: {data[key].product1.customer1.CustomerID}
                    <br />
                    Product Number: {data[key].product1.customer1.ProductNumber}
                    <br />
                    Serial Number: {data[key].product1.customer1.SerialNumber}
                    <br />
                    Policy Period: {data[key].product1.customer1.PolicyPeriod}
                  </Panel>
                  <Panel header="Customer 2" key="2">
                    Customer ID: {data[key].product1.customer2.CustomerID}
                    <br />
                    Product Number: {data[key].product1.customer2.ProductNumber}
                    <br />
                    Serial Number: {data[key].product1.customer2.SerialNumber}
                    <br />
                    Policy Period: {data[key].product1.customer2.PolicyPeriod}
                  </Panel>
                  <Panel header="Customer 3" key="3">
                    Customer ID: {data[key].product1.customer3.CustomerID}
                    <br />
                    Product Number: {data[key].product1.customer3.ProductNumber}
                    <br />
                    Serial Number: {data[key].product1.customer3.SerialNumber}
                    <br />
                    Policy Period: {data[key].product1.customer3.PolicyPeriod}
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
    </AppLayout>
  )
}

const data = {
  '1': {
    key: '1',

    policyID: '000001',

    policyDes: 'this is policy description',

    product1: {
      customer1: {
        CustomerID: '000001',

        ProductNumber: '000005',

        SerialNumber: '000012',

        PolicyPeriod: '14/4/19 - 14/4/21',
      },
      customer2: {
        CustomerID: '000003',

        ProductNumber: '000805',

        SerialNumber: '003012',

        PolicyPeriod: '19/4/19 - 14/9/21',
      },
      customer3: {
        CustomerID: '000963',

        ProductNumber: '000098',

        SerialNumber: '000789',

        PolicyPeriod: '24/4/19 - 24/4/22',
      },
    },
  }
}
