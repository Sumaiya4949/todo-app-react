import { Form, Input, Button, Typography, notification } from "antd";
import axios from "axios";
import { SHA3 } from "sha3";
import { useNavigate } from "react-router-dom";
import { validatePassword } from "../utils/validator";
import { useCallback } from "react";

const { Title } = Typography;

/**
 * React component to visualize registration form
 * @returns {JSX} JSX of the registration form
 */
export const RegistrationForm = () => {
  const navigate = useNavigate();

  /**
   * Handle if form submission fails
   * @description
   *  - Shows an error toast
   */
  const onFinishFailed = useCallback(() => {
    notification.error({
      message: `Registration failed`,
      description: "Please try again",
      placement: "top",
    });
  }, []);

  /**
   * Handle if form is successfully submitted
   * @description
   *  - Calculates password hash value
   *  - Requests the server for user registration
   *  - If request is successfull
   *    - Shows a success message
   *    - Takes user back to login page
   *  - If request is failed
   *    - Shows an error message
   * @param {any} values Object containing all the form field values by their field name
   */
  const onFinish = useCallback(
    async (values: any) => {
      const hash = new SHA3(512);
      hash.update(values.password);

      try {
        await axios.put("/auth/register", {
          email: values.email,
          fullname: values.fullname,
          passwordHash: hash.digest("hex"),
        });

        notification.success({
          message: `Registration successfull`,
          description: "Taking you back to login page",
          placement: "top",
          duration: 1,
        });

        navigate("/");
      } catch (error: any) {
        notification.error({
          message: `Registration failed`,
          description: `${error?.response?.data?.message}. Please try again.`,
          placement: "top",
        });
      }
    },
    [navigate]
  );

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
      <Title level={4}>Please register yourself to use this app</Title>
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
        label="Full Name"
        name="fullname"
        rules={[
          {
            required: true,
            message: "Please input your full name!",
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
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
