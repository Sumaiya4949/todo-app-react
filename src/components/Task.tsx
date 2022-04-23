import { TaskType } from "../types";
import styles from "../styles/Task.module.scss";
import { Space, Button, Typography, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

type PropType = {
  task: TaskType;
  sl: number;
  className?: string;
};

export const Task = (props: PropType) => {
  const { task, sl, className } = props;

  return (
    <Space className={`${styles.container} ${className}`}>
      <Title className={styles.title} level={4}>
        {sl}
      </Title>
      <Title className={styles.title} level={4}>
        {task.title}
      </Title>
      <Checkbox checked={task.isDone}>Done</Checkbox>
      <Button danger={true} type="text">
        <DeleteOutlined />
      </Button>
    </Space>
  );
};
