import React , { useState, useEffect }from 'react'
import { useParams } from 'react-router-dom'
import { Descriptions } from 'antd'
import { AppLayout } from '../components/app-layout'

export const ViewProductPage = (props) => {
  let { key } = useParams()
  //API Breaking Bad
  const [item, setItems] = useState([])
  const fetchItem = async () => {
    const data = await fetch(`https://www.breakingbadapi.com/api/characters/`+key)
    const item = await data.json()
    setItems(item)
    console.log(item)
  }
  useEffect(() => {
    fetchItem()
  }, [])
  return (
    <AppLayout {...props} nosearch title="Product Information">
      <div className="site-layout-content">
        <Descriptions
          title=
          {item.map((item) => (
            item.name
          ))}
          layout="vertical"
          bordered
          column={2}
        >
          <Descriptions.Item label="Product Image">
            <img
              className="product-image"
              //src={data[key].image}
              src=
              {item.map((item) => (
                item.img
              ))}
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
            Customer ID: {data[key].customerInfo.customerID}
            <br />
            Customer Name: {data[key].customerInfo.customerName}
            <br />
            Phone Number: {data[key].customerInfo.phoneNum}
            <br />
            Birth Date: {data[key].customerInfo.birthDate}
            <br />
            Address: {data[key].customerInfo.address}
          </Descriptions.Item>
          <Descriptions.Item label="Claim Information">
            Expiry date: {data[key].claimInfo.expiryDate}
            <br />
            Claim Period: {data[key].claimInfo.claimPeriod}
            <br />
            Claim Period Left: {data[key].claimInfo.claimLeft}
            <br />
            Status: {data[key].claimInfo.status}
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
