import { Layout, Typography } from "antd";
import "antd/dist/antd.css";
import styles from "./styles/App.module.scss";
import { Task } from "./components/Task";
import { TodoList } from "./components/TodoList";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const fakeTodos = [
  { isDone: false, title: "Amm Jamm", id: "1234" },
  { isDone: true, title: "Kathal Jamm", id: "7890" },
];

function App() {
  return (
    <Layout>
      <Header className={styles.header}>
        <Title className={styles.title} level={4}>
          TODO APP
        </Title>
      </Header>

      <Content className={styles.content}>
        <TodoList todos={fakeTodos} />
      </Content>

      <Footer className={styles.footer}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
