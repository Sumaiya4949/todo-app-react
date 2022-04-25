import { List, Typography } from "antd";
import { Task } from "./Task";
import styles from "../styles/TodoList.module.scss";
import { useContext } from "react";
import { TodoContext } from "./TodoProvider";

const { Title } = Typography;

export const TodoList = () => {
  const { myTodos } = useContext(TodoContext);

  return (
    <List
      header={<Title level={3}>My Tasks</Title>}
      dataSource={myTodos}
      renderItem={(task, index) => (
        <List.Item>
          <Task className={styles.task} task={task} sl={index + 1} />
        </List.Item>
      )}
    />
  );
};
