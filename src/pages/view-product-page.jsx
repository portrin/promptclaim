import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Descriptions, Collapse } from 'antd'
import { AppLayout } from '../components/app-layout'

const { Panel } = Collapse

export const ViewProductPage = (props) => {
  let { key } = useParams()
  //API
  const [item, setItems] = useState([])
  const [name, setName] = useState('')
  const [create, setCreate] = useState('')
  const [serial, setSerial] = useState('')
  const [product, setProduct] = useState('')
  const [branch, setBranch] = useState('')
  const [invoice, setInvoice] = useState('')
  const [cusID, setCusID] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [phonenum, setPhonenum] = useState('')
  const [birth, setBirth] = useState('')
  const fetchItem = async () => {
    const data = await fetch(
      'http://ec2-3-0-20-60.ap-southeast-1.compute.amazonaws.com:8001/retailer/product/getByProductNo/' +
        key,
      {
        headers: {
          Authorization: localStorage.token,
        },
      },
    )
    const item = await data.json()
    setItems(item)
    console.log(item)
    await setName(item[0].product_name)
    await setCreate(item[0].create_timestamp)
    await setSerial(item[0].serial_no)
    await setProduct(item[0].product_no)
    await setBranch(item[0].retailer_branch_id)
    await setInvoice(item[0].invoice_id)
    await setCusID(item[0].customer_id)
    await setFname(item[0].firstname)
    await setLname(item[0].lastname)
    await setPhonenum(item[0].phone_no)
    await setBirth(item[0].birth_date)
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
        <Descriptions title={name} layout="vertical" bordered column={2}>
          <Descriptions.Item label="Product Image">
            <img
              className="product-image"
              //src={data[key].image}
              src={item.map((item) => item.product_photo)}
              alt="product"
            />
          </Descriptions.Item>
          <Descriptions.Item label="Product Information">
            Purchase date: {create.substr(0, 10)}
            <br />
            Serial Number: {serial}
            <br />
            Product Number: {product}
            <br />
            Branch ID: {branch}
            <br />
            Invoice ID: {invoice}
          </Descriptions.Item>
          <Descriptions.Item label="Customer Information">
            Customer ID: {cusID}
            <br />
            Customer Name: {fname}{' '}{lname}
            <br />
            Phone Number: {phonenum}
            <br />
            Birth Date: {birth.substr(0, 10)}
          </Descriptions.Item>
          <Descriptions.Item label="Claim Information">
            Claim ID:
            <br/>
            {item.map((item) => (
              <Collapse>
                <Panel header={item.claim_id}>
                  Claim Status: {item.status===null?"Unclaimed":item.status}
                  <br/>
                  Claim Time Stamp: {item.claim_log_timestamp===null?"-":item.claim_log_timestamp.substr(0, 10)}
                  <br/>
                  Service Center Branch: {item.service_center_branch_name===null?"-":item.service_center_branch_name}
                </Panel>
              </Collapse>
            ))}
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
