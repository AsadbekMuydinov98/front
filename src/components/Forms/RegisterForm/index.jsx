import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const RegisterForm = ({ switchToLogin }) => {
  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/signup', values);
      message.success('Registration successful!');
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      message.error('Registration failed!');
    }
  };

  return (
    <Form
      name="register_form"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
          Register
        </Button>
        <Button type="link" onClick={switchToLogin}>
          Back to Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
