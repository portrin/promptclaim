import React from 'react'
import { Table } from 'antd'

import { AppLayout } from '../components/app-layout'

export const MainPolicyPage = (props) => {
  return (
    <AppLayout {...props} title="Policy Dashboard">
      <div className="site-layout-content">
        <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                console.log({ record, rowIndex })
                props.history.push(`/view-policy`)
              },
            }
          }}
        />
      </div>
    </AppLayout>
  )
}

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
