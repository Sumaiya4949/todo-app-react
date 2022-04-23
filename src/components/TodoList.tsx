import { List } from "antd";
import { TaskType } from "../types";
import { Task } from "./Task";
import styles from "../styles/TodoList.module.scss";

type PropType = {
  todos: TaskType[];
};

export const TodoList = (props: PropType) => {
  const { todos } = props;

  return (
    <List
      dataSource={todos}
      renderItem={(task, index) => (
        <List.Item>
          <Task className={styles.task} task={task} sl={index + 1} />
        </List.Item>
      )}
    />
  );
};
