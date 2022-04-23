import { List, Typography } from "antd";
import { TaskType } from "../types";
import { Task } from "./Task";
import styles from "../styles/TodoList.module.scss";

const { Title } = Typography;

type PropType = {
  todos: TaskType[];
  removeTaskById: (id: string) => void;
};

export const TodoList = (props: PropType) => {
  const { todos, removeTaskById } = props;

  return (
    <List
      header={<Title level={3}>My Tasks</Title>}
      dataSource={todos}
      renderItem={(task, index) => (
        <List.Item>
          <Task
            className={styles.task}
            task={task}
            sl={index + 1}
            removeTaskById={removeTaskById}
          />
        </List.Item>
      )}
    />
  );
};
