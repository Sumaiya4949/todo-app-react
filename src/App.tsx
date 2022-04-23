import { Layout, Typography } from "antd";
import "antd/dist/antd.css";
import "./App.scss";
import { Task } from "./components/Task";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout className="layout">
      <Header className="header">
        <Title className="title" level={4}>
          TODO APP
        </Title>
      </Header>

      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
          <Task sl={5} task={{ isDone: false, title: "Amm" }} />
        </div>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
