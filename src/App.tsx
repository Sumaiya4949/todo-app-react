import { Layout, Typography } from "antd";
import "antd/dist/antd.css";
import styles from "./styles/App.module.scss";
import { TodoList } from "./components/TodoList";
import { TaskAddForm } from "./components/TaskAddForm";
import { useContext, useEffect } from "react";
import { TodoContext } from "./components/TodoProvider";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App = () => {
  const { myTodos, addNewTask, removeTaskById, changeTaskStatus } =
    useContext(TodoContext);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(myTodos));
  }, [myTodos]);

  return (
    <Layout>
      <Header className={styles.header}>
        <Title className={styles.title} level={4}>
          TODO APP
        </Title>
      </Header>

      <Content className={styles.content}>
        <TaskAddForm className={styles.todoForm} addTask={addNewTask} />
        <TodoList
          todos={myTodos}
          removeTaskById={removeTaskById}
          changeTaskStatus={changeTaskStatus}
        />
      </Content>

      <Footer className={styles.footer}>TODO App 2022 Created by Sinthy</Footer>
    </Layout>
  );
};

export default App;
