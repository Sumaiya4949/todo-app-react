import { TaskType } from "../types";
import { Form, Input, Button } from "antd";
import styles from "../styles/TaskAddForm.module.scss";
import { v4 as makeId } from "uuid";
import { useCallback } from "react";

type PropType = {
  addTask: (task: TaskType) => void;
  className?: string;
};
/**
 * React component to visualize a form for task addition
 *
 * @param {PropType} props Props of the component
 * @returns {JSX} JSX of this component
 */
export const TaskAddForm = (props: PropType) => {
  // Unpack props
  const { addTask, className } = props;

  const [form] = Form.useForm();

  /**
   * Handle form submission
   * @description
   *  - Creates new task by calling a function from props
   *  - Reset the form fields
   * @param {any} values Values of all the form fields
   */
  const onFinish = useCallback(
    (values: any) => {
      addTask({
        isDone: false,
        id: makeId(),
        title: values.taskTitle,
      });

      form.resetFields();
    },
    [form]
  );

  //JSX
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
