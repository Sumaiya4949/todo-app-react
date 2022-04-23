import { TaskType } from "../types";
import styles from "../styles/Task.module.scss";
import { Space, Button, Typography, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

type PropType = {
  task: TaskType;
  sl: number;
  className?: string;
  removeTaskById: (id: string) => void;
};

export const Task = (props: PropType) => {
  const { task, sl, className, removeTaskById } = props;

  const removeThisTask = () => {
    const result = window.confirm(`Do you want to delete "${task.title}"`);
    if (result === true) {
      removeTaskById(task.id);
    }
  };

  return (
    <Space className={`${styles.container} ${className}`}>
      <Title className={styles.title} level={4}>
        {sl}
      </Title>
      <Title className={styles.title} level={4}>
        {task.title}
      </Title>
      <Checkbox checked={task.isDone}>Done</Checkbox>
      <Button danger={true} type="text" onClick={removeThisTask}>
        <DeleteOutlined />
      </Button>
    </Space>
  );
};
