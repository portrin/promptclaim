import React, { useState, useEffect } from 'react'
import { Table } from 'antd'

import { AppLayout } from '../components/app-layout'

export const MainPolicyPage = (props) => {
  const [items, setItems] = useState([])
  const fetchItem = async () => {
    const data = await fetch('http://localhost:8001/retailer/policy/get', {
      headers: {
        Authorization: localStorage.token,
      },
    })
    const items = await data.json()
    setItems(items)
    console.log('items', items)
  }
  useEffect(() => {
    fetchItem()
  }, [])
  const dataBB = items.map((item, index) => ({
    key: item.uuid,
    policy: item.policy_id,
    type: '3',
    num: '30',
    owner: item.policy_owner_id,
  }))

  console.log(dataBB)

  //filtered duplicated data

  const distinctValues = Array.from(
    new Set(items.map((elem) => `${elem.policy_id}-${elem.policy_owner_id}`)),
  ).map((distinctVal) => {
    const [policy_id, policy_owner_id] = distinctVal.split('-')
    return {
      policy_id,
      policy_owner_id,
    }
  })
  console.log(distinctValues)

  console.log(Object.keys(items).length)

  const filteredData = distinctValues.map((item, index) => ({
    policy: item.policy_id,
    type: Object.keys(items).length,
    num: Object.keys(items).length,
    owner: item.policy_owner_id,
  }))

  console.log(filteredData)

  return (
    <AppLayout {...props} title="Policy Dashboard">
      <div className="site-layout-content">
        <Table
          columns={columns}
          dataSource={filteredData}
          onChange={onChange}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                console.log({ record, rowIndex })
                props.history.push(`/view-policy/${record.policy}`)
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
