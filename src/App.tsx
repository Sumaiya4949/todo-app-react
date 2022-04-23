import { Layout, Typography } from "antd";
import "antd/dist/antd.css";
import styles from "./styles/App.module.scss";
import { Task } from "./components/Task";
import { TodoList } from "./components/TodoList";
import { TaskAddForm } from "./components/TaskAddForm";
import { useState } from "react";
import { TaskType } from "./types";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const [myTodos, setMyTodos] = useState<TaskType[]>([]);

  const addNewTask = function (task: TaskType) {
    setMyTodos((prev) => {
      return [...prev, task];
    });
  };

  return (
    <Layout>
      <Header className={styles.header}>
        <Title className={styles.title} level={4}>
          TODO APP
        </Title>
      </Header>

      <Content className={styles.content}>
        <TaskAddForm className={styles.todoForm} addTask={addNewTask} />
        <TodoList todos={myTodos} />
      </Content>

      <Footer className={styles.footer}>TODO App 2022 Created by Sinthy</Footer>
    </Layout>
  );
}

export default App;
