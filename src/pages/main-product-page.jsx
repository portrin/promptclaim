import React, { useState, useEffect } from 'react'
import { Table } from 'antd'

// import { DataTable } from '../components/table'

import { AppLayout } from '../components/app-layout'

export const MainProductPage = (props) => {
  //API Breaking Bad
  const [items, setItems] = useState([])
  const fetchItem = async () => {
    const data = await fetch(`https://www.breakingbadapi.com/api/characters/`)
    const items = await data.json()
    setItems(items)
    console.log('items', items)
  }
  useEffect(() => {
    fetchItem()
  }, [])
  const dataBB = items.map((item, index) => ({
    key: index + 1,
    name: item.name,
    serial: item.char_id,
    warranty: '1234',
    expiry: item.birthday,
  }))
  //Dashboard
  return (
    <AppLayout {...props} title="Product Dashboard">
      <div className="site-layout-content">
        {/* <div>
          {items.map((item) => (
            <h1 key={items.char_id}>{item.name}</h1>
          ))}
        </div> */}
        {/* {items.map((item) => (
          <Table
            columns={columns}
            dataSource={item}
            onChange={onChange}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  console.log({ record, rowIndex })
                  props.history.push(`/view-product/${record.key}`)
                },
              }
            }}
          />
        ))} */}
        <Table
          columns={columns}
          dataSource={dataBB}
          onChange={onChange}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                console.log({ record, rowIndex })
                props.history.push(`/view-product/${record.key}`)
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
    title: 'Name',
    dataIndex: 'name',
    // specify the filter category
    filters: [
      {
        text: 'Toilet Bowl',
        value: 'Toilet Bowl',
      },
      {
        text: 'Air Conditioner',
        value: 'Air Conditioner',
      },
      {
        text: 'Water Heater',
        value: 'Water Heater',
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) !== -1,
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Serial No.',
    dataIndex: 'serial',
    sorter: (a, b) => a.serial - b.serial,
  },
  {
    title: 'Warranty No.',
    dataIndex: 'warranty',
    sorter: (a, b) => a.warranty - b.warranty,
  },
  {
    title: 'Expiry Date',
    dataIndex: 'expiry',
    sorter: (a, b) => a.expiry2 - b.expiry2,
  },
]

//Mock data
const data = [
  {
    key: '1',
    name: 'COTTO Automatic Toilet Bowl',
    serial: '000027',
    warranty: '002450',
    expiry: '20/03/2020',
    expiry2: '2020',
  },
  {
    key: '2',
    name: 'AMERICAN STANDARD Toilet Bowl',
    serial: '000001',
    warranty: '000495',
    expiry: '10/05/2024',
    expiry2: '2024',
  },
  {
    key: '3',
    name: 'STIEBEL ELTRON Water Heater',
    serial: '002304',
    warranty: '000007',
    expiry: '24/05/2022',
    expiry2: '2022',
  },
  {
    key: '4',
    name: 'DAIKIN Air Conditioner',
    serial: '304023',
    warranty: '030512',
    expiry: '29/03/2021',
    expiry2: '2021',
  },
]

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra)
}
