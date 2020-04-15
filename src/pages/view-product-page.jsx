import React from 'react'
import { useParams } from 'react-router-dom'
import { Descriptions } from 'antd'
import { AppLayout } from '../components/app-layout'

export const ViewProductPage = (props) => {
  let { key } = useParams()
  return (
    <AppLayout {...props} nosearch title="Product Information">
      <div className="site-layout-content">
        <Descriptions
          title={data[key].productName}
          layout="vertical"
          bordered
          column={2}
        >
          <Descriptions.Item label="Product Image">
            <img
              className="product-image"
              src={data[key].image}
              alt="product"
            />
          </Descriptions.Item>
          <Descriptions.Item label="Product Information">
            Purchase date: {data[key].productInfo.purchaseDate}
            <br />
            Serial Number: {data[key].productInfo.serialNum}
            <br />
            warranty Number: {data[key].productInfo.warrantyNum}
            <br />
            Supplier ID: {data[key].productInfo.warrantyNum}
            <br />
            Retailer ID: {data[key].productInfo.retailerID}
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
    </AppLayout>
  )
}

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
  },
  '3': {
    key: '3',

    image: '/water-heater.jpg',

    productName: 'STIEBEL ELTRON Water Heater',
  },
  '4': {
    key: '4',

    image: '/air.jpg',

    productName: 'DAIKIN Air Conditioner',
  },
}
