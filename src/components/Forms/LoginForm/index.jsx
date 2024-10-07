import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const LoginForm = ({ switchToRegister }) => {
  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', values);
      message.success('Login successful!');
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      message.error('Login failed!');
    }
  };

  return (
    <Form
      name="login_form"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
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
          Login
        </Button>
        <Button type="link" onClick={switchToRegister}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
