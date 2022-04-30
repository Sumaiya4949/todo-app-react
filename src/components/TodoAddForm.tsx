import { TodoType } from "../types";
import { Form, Input, Button } from "antd";
import styles from "../styles/TodoAddForm.module.scss";
import { v4 as makeId } from "uuid";
import { useCallback } from "react";
import { PlusSquareOutlined } from "@ant-design/icons";

type PropType = {
  addTodo: (todo: TodoType) => void;
  className?: string;
};
/**
 * React component to visualize a form for todo addition
 *
 * @param {PropType} props Props of the component
 * @returns {JSX} JSX of this component
 */
export const TodoAddForm = (props: PropType) => {
  // Unpack props
  const { addTodo, className } = props;

  const [form] = Form.useForm();

  /**
   * Handle form submission
   * @description
   *  - Creates new todo by calling a function from props.
   *  - Reset the form fields.
   * @param {any} values Values of all the form fields
   */
  const onFinish = useCallback(
    (values: any) => {
      addTodo({
        isDone: false,
        id: makeId(),
        title: values.todoTitle,
      });

      form.resetFields();
    },
    [form]
  );

  //JSX
  return (
    <Form
      className={`${styles.container} ${className}`}
      name="todo-form"
      onFinish={onFinish}
      autoComplete="off"
      form={form}
    >
      <Form.Item name="todoTitle">
        <Input.TextArea size="large" placeholder="Add new todo" />
      </Form.Item>

      <Form.Item>
        <Button type="default" htmlType="submit">
          <PlusSquareOutlined />
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
