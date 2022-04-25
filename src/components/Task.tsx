import { TaskType } from "../types";
import styles from "../styles/Task.module.scss";
import { Space, Button, Typography, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useCallback, useContext } from "react";
import { TodoContext } from "./TodoProvider";

const { Title } = Typography;

type PropType = {
  task: TaskType;
  sl: number;
  className?: string;
};

export const Task = (props: PropType) => {
  const { task, sl, className } = props;

  const { removeTaskById, changeTaskStatus } = useContext(TodoContext);

  const removeMe = useCallback(() => {
    const result = window.confirm(`Do you want to delete "${task.title}"`);
    if (result) {
      removeTaskById(task.id);
    }
  }, [task.title, task.id]);

  const toggleMyStatus = useCallback(
    (event: CheckboxChangeEvent) => {
      changeTaskStatus(task.id, event.target.checked);
    },
    [task.id]
  );

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
