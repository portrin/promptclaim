import React from 'react'
import { Form, Input, Button, Checkbox, Row, Col } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useState } from 'react'
import logo from '../photo/darktranslogo.png'
export const LoginPage = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [isSubmitted, setIsSubmitted] = useState(false)
  // const [isCorrected, setIsCorrected] = useState(false)

  // const sendSubmit = (event) => {
  //   event.preventDefault()
  //   console.log('username: ', username, 'password: ', password)

  //   if (username === 'bob' && password === '123456') {
  //     props.history.push('/')
  //   } else {
  //     console.log('wrong')
  //   }

    // axios.post("http://propclaim.com"+"/guest/authen", {username: username, password:password}).then(response=>
    // console.log(response)
    // if (response.data.token){
    //   localStorage.setItem("token", response.data.token)

    // }else if(response.data === "incorrect"){

    // }

    // )

    // setIsSubmitted(true);
    // console.log(isSubmitted);
  }

  // fetch('url',{
  //   method:'POST',
  //   body : JSON.stringify({
  //     username: username,
  //     password: password
  //   }),
  //   headers: {
  //     "Content-type": ""// header to called api
  //   }
  // })
  // .then(response => response.json())
  // .then(console.log)


  return (
    <article>
      <Form>
        <img className="logo-login" src={logo} alt="logo" />
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
