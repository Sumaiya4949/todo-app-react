import { Layout, Typography } from "antd";
import "antd/dist/antd.css";
import styles from "./styles/App.module.scss";
import { TodoList } from "./components/TodoList";
import { TaskAddForm } from "./components/TaskAddForm";
import { useTodoList } from "./hooks/useTodoList";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

/**
 * React componet to visualize the todo application
 * @returns {JSX} JSX of the app component
 */
const App = () => {
  const { addNewTask, myTodos, removeTaskById, changeTaskStatus } =
    useTodoList();

  //JSX
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
