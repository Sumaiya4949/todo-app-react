import { Layout, Typography } from "antd";
import "antd/dist/antd.css";
import styles from "./styles/App.module.scss";
import { TodoList } from "./components/TodoList";
import { TaskAddForm } from "./components/TaskAddForm";
import { useCallback, useEffect, useReducer } from "react";
import { TaskType } from "./types";
import {
  ACTION_ADD_TODO,
  ACTION_REMOVE_TODO,
  initialAppState,
  todoReducer,
} from "./reducers/todoReducer";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App = () => {
  const [appState, dispath] = useReducer(todoReducer, initialAppState);

  const { myTodos } = appState;

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(myTodos));
  }, [myTodos]);

  const addNewTask = useCallback(
    (task: TaskType): void => {
      dispath({
        type: ACTION_ADD_TODO,
        payload: { task },
      });
    },
    [dispath]
  );

  const removeTaskById = useCallback(
    (id: string): void => {
      dispath({
        type: ACTION_REMOVE_TODO,
        payload: { id },
      });
    },
    [dispath]
  );

  const changeTaskStatus = useCallback((id: string, isDone: boolean): void => {
    // setMyTodos((prev) => {
    //   return prev.map((task) => {
    //     if (task.id !== id) {
    //       return task;
    //     }
    //     return { ...task, isDone };
    //   });
    // });
  }, []);

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
