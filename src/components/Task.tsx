import { TaskType } from "../types";
import styles from "../styles/Task.module.scss";
import { Space, Button, Typography, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

type PropType = {
  task: TaskType;
  sl: number;
};

export const Task = (props: PropType) => {
  const { task, sl } = props;
  return (
    <Space>
      <Title level={4}>{sl}</Title>
      <Title level={4}>{task.title}</Title>
      <Checkbox>Done</Checkbox>
      <Button danger={true}>
        <DeleteOutlined />
      </Button>
    </Space>
  );
};
