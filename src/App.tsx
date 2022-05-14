import { Layout, Typography, Image, notification, Modal } from "antd";
import "antd/dist/antd.css";
import { useCallback, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { AuthUserBadge } from "./components/AuthUserBadge";
import { LoginForm } from "./pages/LoginForm";
import { MyTodos } from "./pages/MyTodos";
import { RegistrationForm } from "./pages/RegistrationForm";
import styles from "./styles/App.module.scss";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useLazyQuery, useQuery, useReactiveVar } from "@apollo/client";
import { authUserVar } from "./utils/cache";
import { saveAuthDataToLocalStorage } from "./utils/helperFunctions";
import { QUERY_LOGOUT, QUERY_MY_INFO } from "./utils/queries";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

/**
 * React component to visualize the todo application
 * @returns {JSX} JSX of the app component
 */
const App = () => {
  const { isLoggedIn, user } = useReactiveVar(authUserVar);

  const { data: myData, error: myDataError } = useQuery(QUERY_MY_INFO);

  const [logoutQuery, { data: logoutData, error: logoutError }] =
    useLazyQuery(QUERY_LOGOUT);

  /**
   * Logout after user confirmation
   * @description
   *  - Request the server for user logout after user confirmation
   *  - If request is successfull
   *    - Shows a success message
   *    - Erases user information and login status
   *  - If request is failed
   *    - Shows an error message
   */
  const logout = useCallback(() => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: <Typography.Title level={4}>Are you sure?</Typography.Title>,
      onOk() {
        logoutQuery();
      },
    });
  }, [logoutQuery]);

  /**
   * Effect to execute when auth user data is available after the query execution
   */
  useEffect(() => {
    if (myData) {
      const { me } = myData;
      saveAuthDataToLocalStorage(true, me);
      authUserVar({ isLoggedIn: true, user: me });
    }
  }, [myData]);

  /**
   * Effect to execute when the query execution for auth user data fails
   */
  useEffect(() => {
    if (myDataError) {
      saveAuthDataToLocalStorage(false, null);
      authUserVar({ isLoggedIn: false, user: null });
    }
  }, [myDataError]);

  /**
   * Effect to execute when logout query succeeds
   */
  useEffect(() => {
    if (logoutData) {
      notification.success({
        message: `Logout successfull`,
        description: "Taking you to the login page",
        placement: "top",
        duration: 0.5,
      });
      saveAuthDataToLocalStorage(false, null);
      authUserVar({ isLoggedIn: false, user: null });
    }
  }, [logoutData]);

  /**
   * Effect to execute when logout query fails
   */
  useEffect(() => {
    if (logoutError) {
      notification.error({
        message: `Logout failed`,
        description: `Please try again.`,
        placement: "top",
        duration: 1,
      });
    }
  }, [logoutError]);

  // JSX
  return (
    <Layout>
      <Header className={styles.header}>
        <Image src="logo192.png" className={styles.logo} />
        <Title className={styles.title} level={4}>
          <Link to="/">TODO APP</Link>
        </Title>
        {isLoggedIn && (
          <AuthUserBadge
            className={styles.authUserBadge}
            logout={logout}
            userName={user?.fullname}
          />
        )}
      </Header>

      <Content className={styles.content}>
        <Routes>
          <Route path="register" element={<RegistrationForm />} />
          <Route path="/" element={isLoggedIn ? <MyTodos /> : <LoginForm />} />
        </Routes>
      </Content>

      <Footer className={styles.footer}>TODO App 2022 Created by Sinthy</Footer>
    </Layout>
  );
};

export default App;
