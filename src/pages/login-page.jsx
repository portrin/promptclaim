 import React from 'react'
import { Form, Input, Button, Checkbox, Row, Col } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useState } from 'react'


export const LoginPage = (props) => {
  

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrected, setIsCorrected] = useState(false);

  // function sendChange(event) {
  //   const {name, value } = event.target;
  //   setValues({
  //     ...values, 
  //     [name]: value
  //   });
  //   console.log(values);

  // }

  function sendSubmit(event) {
    event.preventDefault();
    console.log("username: ", username, "password: ",password);

    if(username==="bob" && password==="123456"){
      props.history.push("/")
    }else{
      console.log("wrong")
    }


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


  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <img className="biglogo" src="darktranslogo.png" alt="logo" />
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          <Form.Item
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
        </Col>
        <Col span={8}></Col>
      </Row>
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
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
        </Col>
        <Col span={8}></Col>
      </Row>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        Forgot password
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className="login-form-button"
          style={{ background: '#0050b3', borderColor: '#0050b3' }}
          onClick={() => props.history.push('/')}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}
