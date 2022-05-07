import { Form, Input, Button, Typography, notification, Alert } from "antd";
import axios from "axios";
import { SHA3 } from "sha3";
import { useNavigate, Link } from "react-router-dom";
import { validatePassword } from "../utils/validator";

const { Title } = Typography;

export const LoginForm = () => {
  const navigate = useNavigate();

  const onFinishFailed = () => {
    notification.error({
      message: `Login failed`,
      description: "Please try again",
      placement: "top",
    });
  };

  const onFinish = async (values: any) => {
    const hash = new SHA3(512);
    hash.update(values.password);

    try {
      await axios.post("/auth/login", {
        email: values.email,
        passwordHash: hash.digest("hex"),
      });

      notification.success({
        message: `Login successfull`,
        description: "Taking you to the todo app",
        placement: "top",
      });

      navigate("/");
    } catch (error: any) {
      notification.error({
        message: `Login failed`,
        description: `${error?.response?.data?.message}. Please try again.`,
        placement: "top",
      });
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Title level={4}>Please log in to use todo app</Title>
      <br />
      <Form.Item
        name={"email"}
        label="Email"
        rules={[
          { type: "email" },
          {
            required: true,
            message: "Please input a valid email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          {
            validator: validatePassword,
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>

      <Alert
        message={
          <>
            Don't have an account? Please register{" "}
            <Link to="/register">here</Link>.
          </>
        }
        type="info"
        showIcon
      />
    </Form>
  );
};
