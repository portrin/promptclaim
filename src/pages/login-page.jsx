import React from 'react'
import { Form, Input, Button, Checkbox, Row, Col, Modal } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useState } from 'react'
import logo from '../photo/darktranslogo.png'
import api from '../api.jsx'

export const LoginPage = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function errorToast() {
    Modal.error({
      title: 'Invalid Username or Password',
      content: 'please try again',
    })
  }
  const sendSubmit = () => {
    api
      .post(
        '/retailer/auth/login',
        {
          username: username,
          password: password,
        },

        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      )
      .then(
        (response) => {
          console.log('response: ' + response)
          if (response.data) {
            const token = response.data
            console.log('token: ', token)
            if (token === 'invalid username or password') {
              console.log('Bugg invalid username or password')
              setUsername('')
              setPassword('')
              errorToast()
            } else {
              localStorage.setItem('token', token)
              // localstorage.setItem('username', response.data.username)
              props.history.push('/main-product')
              console.log('correct')
            }
          } else if (response.data === 'Incorrect') {
          }
          // console.log(localStorage.token)
        },
        (error) => {
          console.log('error' + error)
        },
      )
  }

  return (
    <article className="Login-Page">
      <Form>
        <img
          className="logo-login animated infinite bounce delay-2s"
          src={logo}
          alt="logo"
        />
        <Row>
          <Col span={8}></Col>
          <Col span={8}>
            <Form.Item
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
          </Col>
          <Col span={8}></Col>
        </Row>
        <Row>
          <Col span={8}></Col>
          <Col span={8}>
            <Form.Item
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
          </Col>
          <Col span={8}></Col>
        </Row>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="login-form-button"
            style={{ background: '#0050b3', borderColor: '#0050b3' }}
            onClick={sendSubmit}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </article>
  )
}
