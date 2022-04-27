import { TaskRemover, TaskStatusChanger, TaskType } from "../types";
import styles from "../styles/Task.module.scss";
import { Space, Button, Typography, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useCallback } from "react";

const { Title } = Typography;

type PropType = {
  task: TaskType;
  sl: number;
  className?: string;
  removeTaskById: TaskRemover;
  changeTaskStatus: TaskStatusChanger;
};

/**
 * React component to visualize a task
 *
 * @param {PropType} props Props of the component
 * @returns {JSX} JSX of the task component
 */
export const Task = (props: PropType) => {
  // Unpack props
  const { task, sl, className, removeTaskById, changeTaskStatus } = props;

  /**
   * Remove this task after user confirmation
   * @description
   *  - Asks user to confirm.
   *  - Removes this task from todo-list by calling remove function from prop.
   */
  const removeMe = useCallback(() => {
    const result = window.confirm(`Do you want to delete "${task.title}"`);
    if (result) {
      removeTaskById(task.id);
    }
  }, [task.title, task.id]);

  /**
   * Change the status of this task
   * @description
   *  - Calls status changer function from props with this task's id and the status (done or not done).
   */
  const toggleMyStatus = useCallback(
    (event: CheckboxChangeEvent) => {
      changeTaskStatus(task.id, event.target.checked);
    },
    [task.id]
  );

  // JSX
  return (
    <Space className={`${styles.container} ${className}`}>
      <Title className={styles.title} level={4}>
        {sl}
      </Title>

      <Title className={styles.title} level={4}>
        {task.title}
      </Title>

      <Checkbox checked={task.isDone} onChange={toggleMyStatus}>
        Done
      </Checkbox>

      <Button danger={true} type="text" onClick={removeMe}>
        <DeleteOutlined />
      </Button>
    </Space>
  );
};
