import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

export const LoginPage = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }

  return (
    <article class="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <img 
          className="biglogo" 
          src="darktranslogo.png" 
          alt="logo" 
        />

        <Form.Item
          className='userbox'
          name="username"
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

        <Form.Item
          name="password"
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
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            size='large'
            htmlType="submit"
            className="login-form-button"
            style={{ background: '#0050b3', borderColor: '#0050b3' }}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </article>
  )
}
