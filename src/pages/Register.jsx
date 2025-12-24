import { Form, Input, Button, message } from "antd";
import { registerUser } from "../API/api";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await registerUser(values);
      message.success("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      message.error("Username already exists");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto" }}>
      <h2>Register</h2>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="username" label="Username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Register
        </Button>
      </Form>
    </div>
  );
};
