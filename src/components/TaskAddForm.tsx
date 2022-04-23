import { TaskType } from "../types";
import { Form, Input, Button } from "antd";
import styles from "../styles/TaskAddForm.module.scss";
import { v4 as makeId } from "uuid";

type PropType = {
  addTask: (task: TaskType) => void;
};

export const TaskAddForm = (props: PropType) => {
  const { addTask } = props;

  function onFinish(values: any) {
    addTask({
      isDone: false,
      id: makeId(),
      title: values.taskTitle,
    });
  }

  return (
    <Form
      className={styles.container}
      name="task-form"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item name="taskTitle">
        <Input.TextArea size="large" placeholder="Add new task" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
