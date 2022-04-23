import { TaskRemover, TaskStatusChanger, TaskType } from "../types";
import styles from "../styles/Task.module.scss";
import { Space, Button, Typography, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const { Title } = Typography;

type PropType = {
  task: TaskType;
  sl: number;
  className?: string;
  removeTaskById: TaskRemover;
  changeTaskStatus: TaskStatusChanger;
};

export const Task = (props: PropType) => {
  const { task, sl, className, removeTaskById, changeTaskStatus } = props;

  const removeMe = (): void => {
    const result = window.confirm(`Do you want to delete "${task.title}"`);

    if (result === true) {
      removeTaskById(task.id);
    }
  };

  const toggleMyStatus = (event: CheckboxChangeEvent) => {
    changeTaskStatus(task.id, event.target.checked);
  };

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
