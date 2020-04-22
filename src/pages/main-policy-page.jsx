import React, { useState, useEffect } from 'react'
import { Table } from 'antd'

import { AppLayout } from '../components/app-layout'
// import Item from 'antd/lib/list/Item'

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
  //filtered duplicated data

  const distinctValues = Array.from(
    new Set(
      items.map(
        (elem) =>
          `${elem.policy_id}-${elem.policy_owner_id}-${elem.date_created}`,
      ),
    ),
  ).map((distinctVal) => {
    const [policy_id, policy_owner_id, date_created] = distinctVal.split('-')
    return {
      date_created,
      policy_id,
      policy_owner_id,
    }
  })
  console.log('q', distinctValues)

  const filteredData = distinctValues.map((item) => ({
    policy: item.policy_id,
    owner: item.policy_owner_id,
    date: item.date_created,
    num: Object.keys(items).length,
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
    title: 'Policy Owner',
    dataIndex: 'owner',
    sorter: (a, b) => a.owner.length - b.owner.length,
  },
  {
    title: 'Year Created',
    dataIndex: 'date',
    sorter: (a, b) => a.date - b.date,
  },
  {
    title: 'Number of Products',
    dataIndex: 'num',
    sorter: (a, b) => a.num - b.num,
  },
]

// eslint-disable-next-line no-unused-vars
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
