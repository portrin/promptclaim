import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Descriptions } from 'antd'
import { AppLayout } from '../components/app-layout'

export const ViewProductPage = (props) => {
  let { key } = useParams()
  //API
  const [item, setItems] = useState([])
  const fetchItem = async () => {
    const data = await fetch(
      'http://localhost:8001/retailer/product/getByProductNo/' + key,
      {
        headers: {
          Authorization: localStorage.token,
        },
      },
    )
    const item = await data.json()
    setItems(item)
    console.log(item)
  }

  useEffect(() => {
    fetchItem()
    //eslint-disable-next-line
  }, [])
  return (
    <AppLayout
      {...props}
      nosearch
      title="Product Information"
      lastpageProduct="Product Dashboard"
    >
      <div className="site-layout-content">
        <Descriptions
          title={item.map((item) => item.product_name)}
          layout="vertical"
          bordered
          column={2}
        >
          <Descriptions.Item label="Product Image">
            <img
              className="product-image"
              //src={data[key].image}
              src={item.map((item) => item.product_photo)}
              alt="product"
            />
          </Descriptions.Item>
          <Descriptions.Item label="Product Information">
            Purchase date: {item.map((item) => item.create_timestamp)}
            <br />
            Serial Number: {item.map((item) => item.serial_no)}
            <br />
            Product Number: {item.map((item) => item.product_no)}
            <br />
            Branch ID: {item.map((item) => item.retailer_branch_id)}
            <br />
            Invoice ID: {item.map((item) => item.invoice_id)}
          </Descriptions.Item>
          <Descriptions.Item label="Customer Information">
            Customer ID: {item.map((item) => item.customer_id)}
            <br />
            Customer Name: {item.map((item) => item.firstname)}{' '}
            {item.map((item) => item.lastname)}
            <br />
            Phone Number: {item.map((item) => item.phone_no)}
            <br />
            Birth Date: {item.map((item) => item.birth_date)}
          </Descriptions.Item>
          <Descriptions.Item label="Claim Information">
            Start Date: {item.map((item) => item.policy_start_date)}
            <br />
            End Date: {item.map((item) => item.policy_end_date)}
            <br />
            Claim Period: {item.map((item) => item.policy_period)}
            <br />
            Status: {item.map((item) => item.status)}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </AppLayout>
  )
}
// eslint-disable-next-line
const data = {
  '1': {
    key: '1',

    image: '/cotto-toilet-bowl.jpg',

    productName: 'COTTO Automatic Toilet Bowl',

    productInfo: {
      purchaseDate: '20/03/2019',
      serialNum: '000001',
      warrantyNum: '000001',
      supplierID: '000001',
      retailerID: '000001',
    },
    customerInfo: {
      customerID: '123000',
      customerName: 'Jesse Pinkman',
      phoneNum: '0913332211',
      birthDate: '17/08/1998',
      address: '35 phayathai 10',
    },
    claimInfo: {
      expiryDate: '1/1/1',
      claimPeriod: '2 years',
      claimLeft: '1 year',
      status: 'Unclaim',
    },
  },
  '2': {
    key: '2',

    image: '/ame-toilet.jpg',

    productName: 'AMERICAN STANDARD Toilet Bowl',

    productInfo: {
      purchaseDate: '20/03/2019',
      serialNum: '000001',
      warrantyNum: '000001',
      supplierID: '000001',
      retailerID: '000001',
    },
    customerInfo: {
      customerID: '123000',
      customerName: 'Jesse Pinkman',
      phoneNum: '0913332211',
      birthDate: '17/08/1998',
      address: '35 phayathai 10',
    },
    claimInfo: {
      expiryDate: '1/1/1',
      claimPeriod: '2 years',
      claimLeft: '1 year',
      status: 'Unclaim',
    },
  },
  '3': {
    key: '3',

    image: '/water-heater.jpg',

    productName: 'STIEBEL ELTRON Water Heater',

    productInfo: {
      purchaseDate: '20/03/2019',
      serialNum: '000001',
      warrantyNum: '000001',
      supplierID: '000001',
      retailerID: '000001',
    },
    customerInfo: {
      customerID: '123000',
      customerName: 'Jesse Pinkman',
      phoneNum: '0913332211',
      birthDate: '17/08/1998',
      address: '35 phayathai 10',
    },
    claimInfo: {
      expiryDate: '1/1/1',
      claimPeriod: '2 years',
      claimLeft: '1 year',
      status: 'Unclaim',
    },
  },
  '4': {
    key: '4',

    image: '/air.jpg',

    productName: 'DAIKIN Air Conditioner',

    productInfo: {
      purchaseDate: '20/03/2019',
      serialNum: '000001',
      warrantyNum: '000001',
      supplierID: '000001',
      retailerID: '000001',
    },
    customerInfo: {
      customerID: '123000',
      customerName: 'Jesse Pinkman',
      phoneNum: '0913332211',
      birthDate: '17/08/1998',
      address: '35 phayathai 10',
    },
    claimInfo: {
      expiryDate: '1/1/1',
      claimPeriod: '2 years',
      claimLeft: '1 year',
      status: 'Unclaim',
    },
  },
}
