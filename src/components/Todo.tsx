import { TodoRemover, TodoStatusChanger, TodoType } from "../types";
import styles from "../styles/Todo.module.scss";
import { Space, Button, Typography, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useCallback } from "react";

const { Title } = Typography;

type PropType = {
  todo: TodoType;
  sl: number;
  className?: string;
  removeTodoById: TodoRemover;
  changeTodoStatus: TodoStatusChanger;
};

/**
 * React component to visualize a todo
 *
 * @param {PropType} props Props of the component
 * @returns {JSX} JSX of the todo component
 */
export const Todo = (props: PropType) => {
  // Unpack props
  const { todo, sl, className, removeTodoById, changeTodoStatus } = props;

  /**
   * Remove this todo after user confirmation
   * @description
   *  - Asks user to confirm.
   *  - Removes this todo from todo-list by calling remove function from prop.
   */
  const removeMe = useCallback(() => {
    const result = window.confirm(`Do you want to delete "${todo.title}"`);
    if (result) {
      removeTodoById(todo.id);
    }
  }, [todo.title, todo.id, removeTodoById]);

  /**
   * Change the status of this todo
   * @description
   *  - Calls status changer function from props with this todo's id and the status (done or not done).
   */
  const toggleMyStatus = useCallback(
    (event: CheckboxChangeEvent) => {
      changeTodoStatus(todo.id, event.target.checked);
    },
    [todo.id, changeTodoStatus]
  );

  // JSX
  return (
    <Space className={`${styles.container} ${className}`}>
      <Title className={styles.title} level={4}>
        {sl}
      </Title>

      <Title className={styles.title} level={4}>
        {todo.title}
      </Title>

      <Checkbox checked={todo.isDone} onChange={toggleMyStatus}>
        Done
      </Checkbox>

      <Button danger={true} type="text" onClick={removeMe}>
        <DeleteOutlined />
      </Button>
    </Space>
  );
};
