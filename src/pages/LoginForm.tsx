import { Form, Input, Button, Typography, notification, Alert } from "antd";
import { SHA3 } from "sha3";
import { Link } from "react-router-dom";
import { validatePassword } from "../utils/validator";
import { useCallback, useEffect } from "react";
import { saveAuthDataToLocalStorage } from "../utils/helperFunctions";
import { authUserVar } from "../utils/cache";
import { useLazyQuery } from "@apollo/client";
import { QUERY_LOGIN } from "../utils/queries";

const { Title } = Typography;

/**
 * React component to visualize login form
 * @returns {JSX} JSX of the login form
 */
export const LoginForm = () => {
  const [queryLogin, { data, error }] = useLazyQuery(QUERY_LOGIN);

  /**
   * Handle if login fails
   * @description
   *  - Shows an error toast
   */
  const onFinishFailed = useCallback(() => {
    notification.error({
      message: `Login failed`,
      description: "Please try again",
      placement: "top",
    });
  }, []);

  /**
   * Handle if form submission is successfull
   * @description
   *  - Calculates password hash value
   *  - Requests the server for user login
   *  - If request is successfull
   *    - Shows a success message
   *    - Saves user information and login status
   *  - If request is failed
   *    - Shows an error message
   * @param {any} values Object containing all the form field values by their field name
   */
  const onFinish = useCallback(
    (values: any) => {
      const hash = new SHA3(512);
      hash.update(values.password);

      queryLogin({
        variables: {
          email: values.email,
          passwordHash: hash.digest("hex"),
        },
      });
    },
    [queryLogin]
  );

  useEffect(() => {
    if (data) {
      const { user } = data;

      notification.success({
        message: `Login successfull`,
        description: "Taking you to the todo app",
        placement: "top",
        duration: 0.5,
      });

      saveAuthDataToLocalStorage(true, user);
      authUserVar({ isLoggedIn: true, user });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      notification.error({
        message: `Login failed`,
        description: `Please try again.`,
        placement: "top",
      });
    }
  }, [error]);

  //JSX
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
