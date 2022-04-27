import { List, Typography } from "antd";
import { TaskRemover, TaskStatusChanger, TaskType } from "../types";
import { Todo } from "./Todo";
import styles from "../styles/TodoList.module.scss";

const { Title } = Typography;

type PropType = {
  todos: TaskType[];
  removeTaskById: TaskRemover;
  changeTaskStatus: TaskStatusChanger;
};

/**
 * React component to visualize todo list
 *
 * @param {PropType} props Props of this component
 * @returns {JSX} JSX of this task component
 */

export const TodoList = (props: PropType) => {
  // Unpack props
  const { todos, removeTaskById, changeTaskStatus } = props;

  // JSX
  return (
    <List
      header={<Title level={3}>My Tasks</Title>}
      dataSource={todos}
      renderItem={(task, index) => (
        <List.Item>
          <Todo
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
