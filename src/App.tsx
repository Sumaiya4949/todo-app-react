import { Layout, Typography, Image } from "antd";
import "antd/dist/antd.css";
import styles from "./styles/App.module.scss";
import { TodoList } from "./components/TodoList";
import { TodoAddForm } from "./components/TodoAddForm";
import { useTodoList } from "./hooks/useTodoList";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

/**
 * React componet to visualize the todo application
 * @returns {JSX} JSX of the app component
 */
const App = () => {
  const { addNewTodo, myTodos, removeTodoById, changeTodoStatus } =
    useTodoList();

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
        <TodoAddForm className={styles.todoForm} addTodo={addNewTodo} />
        <TodoList
          todos={myTodos}
          removeTodoById={removeTodoById}
          changeTodoStatus={changeTodoStatus}
        />
      </Content>

      <Footer className={styles.footer}>TODO App 2022 Created by Sinthy</Footer>
    </Layout>
  );
};

export default App;
