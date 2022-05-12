import { Layout, Typography, Image, notification, Modal } from "antd";
import "antd/dist/antd.css";
import { useCallback, useContext } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { AuthContext } from "./components/Auth";
import { AuthUserBadge } from "./components/AuthUserBadge";
import { LoginForm } from "./pages/LoginForm";
import { MyTodos } from "./pages/MyTodos";
import { RegistrationForm } from "./pages/RegistrationForm";
import styles from "./styles/App.module.scss";
import axios from "axios";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { API_VERSION } from "./utils/constants";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

/**
 * React component to visualize the todo application
 * @returns {JSX} JSX of the app component
 */
const App = () => {
  const { isLoggedIn, setLoginStatus, user } = useContext(AuthContext);

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
      async onOk() {
        try {
          await axios.post(`/auth/v${API_VERSION}/logout`);

          notification.success({
            message: `Logout successfull`,
            description: "Taking you to the login page",
            placement: "top",
            duration: 0.5,
          });

          setLoginStatus(false, null);
        } catch (error) {
          notification.error({
            message: `Logout failed`,
            description: `Please try again.`,
            placement: "top",
            duration: 1,
          });
        }
      },
    });
  }, [setLoginStatus]);

  //JSX
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
