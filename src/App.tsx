import { Layout, Typography } from "antd";
import "antd/dist/antd.css";
import styles from "./styles/App.module.scss";
import { Task } from "./components/Task";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout>
      <Header className={styles.header}>
        <Title className={styles.title} level={4}>
          TODO APP
        </Title>
      </Header>

      <Content className={styles.content}>
        <Task sl={5} task={{ isDone: false, title: "Amm" }} />
        <Task sl={5} task={{ isDone: false, title: "Bllsdjks" }} />
        <Task
          sl={5}
          task={{ isDone: false, title: "Bllsd sads dqwerq dasad ewqeq eqewq" }}
        />
        <Task sl={5} task={{ isDone: false, title: "sdnfas jdsafs" }} />
      </Content>

      <Footer className={styles.footer}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
