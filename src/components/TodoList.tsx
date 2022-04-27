import { List, Typography } from "antd";
import { TodoRemover, TodoStatusChanger, TodoType } from "../types";
import { Todo } from "./Todo";
import styles from "../styles/TodoList.module.scss";

const { Title } = Typography;

type PropType = {
  todos: TodoType[];
  removeTodoById: TodoRemover;
  changeTodoStatus: TodoStatusChanger;
};

/**
 * React component to visualize todo list
 *
 * @param {PropType} props Props of this component
 * @returns {JSX} JSX of this task component
 */

export const TodoList = (props: PropType) => {
  // Unpack props
  const { todos, removeTodoById, changeTodoStatus } = props;

  // JSX
  return (
    <List
      header={<Title level={3}>My Todos</Title>}
      dataSource={todos}
      renderItem={(todo, index) => (
        <List.Item>
          <Todo
            className={styles.todo}
            todo={todo}
            sl={index + 1}
            removeTodoById={removeTodoById}
            changeTodoStatus={changeTodoStatus}
          />
        </List.Item>
      )}
    />
  );
};
