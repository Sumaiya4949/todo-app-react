import { Layout, Typography, Image } from "antd";
import "antd/dist/antd.css";
import { Route, Routes } from "react-router-dom";
import { MyTodos } from "./pages/MyTodos";
import styles from "./styles/App.module.scss";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

/**
 * React component to visualize the todo application
 * @returns {JSX} JSX of the app component
 */
const App = () => {
  //JSX
  return (
    <Layout>
      <Header className={styles.header}>
        <Image src="logo192.png" className={styles.logo} />
        <Title className={styles.title} level={4}>
          TODO APP
        </Title>
      </Header>

      <Content className={styles.content}>
        <Routes>
          <Route path="mytodos" element={<MyTodos />} />
        </Routes>
      </Content>

      <Footer className={styles.footer}>TODO App 2022 Created by Sinthy</Footer>
    </Layout>
  );
};

export default App;
