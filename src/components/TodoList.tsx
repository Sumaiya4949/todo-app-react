import { List, Typography } from "antd";
import { TaskRemover, TaskStatusChanger, TaskType } from "../types";
import { Task } from "./Task";
import styles from "../styles/TodoList.module.scss";

const { Title } = Typography;

type PropType = {
  todos: TaskType[];
  removeTaskById: TaskRemover;
  changeTaskStatus: TaskStatusChanger;
};

export const TodoList = (props: PropType) => {
  const { todos, removeTaskById, changeTaskStatus } = props;

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
            changeTaskStatus={changeTaskStatus}
          />
        </List.Item>
      )}
    />
  );
};
