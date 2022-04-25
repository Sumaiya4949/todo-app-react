import { Form, Input, Button } from "antd";
import styles from "../styles/TaskAddForm.module.scss";
import { v4 as makeId } from "uuid";
import { useCallback, useContext } from "react";
import { TodoContext } from "./TodoProvider";

type PropType = {
  className?: string;
};

export const TaskAddForm = (props: PropType) => {
  const { className } = props;

  const { addNewTask } = useContext(TodoContext);

  const [form] = Form.useForm();

  const onFinish = useCallback(
    (values: any) => {
      addNewTask({
        isDone: false,
        id: makeId(),
        title: values.taskTitle,
      });

      form.resetFields();
    },
    [form]
  );

  return (
    <Form
      className={`${styles.container} ${className}`}
      name="task-form"
      onFinish={onFinish}
      autoComplete="off"
      form={form}
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
