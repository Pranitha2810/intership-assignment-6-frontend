import { Form, Input, Button, message } from "antd";
import { loginUser } from "../API/api";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await loginUser(values);
      localStorage.setItem("token", res.token);
      message.success("Login successful");
      navigate("/products");
    } catch (err) {
      message.error("Invalid username or password");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto" }}>
      <h2>Login</h2>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="username" label="Username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </Form>
    </div>
  );
};
