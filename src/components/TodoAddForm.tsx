import { Form, Input, Button } from "antd";
import styles from "../styles/TodoAddForm.module.scss";
import { useCallback } from "react";
import { PlusSquareOutlined } from "@ant-design/icons";

type PropType = {
  addTodo: (title: string) => void;
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
      addTodo(values.todoTitle);
      form.resetFields();
    },
    [form, addTodo]
  );

  //JSX
  return (
    <Form
      className={`${styles.container} ${className}`}
      name="todo-form"
      onFinish={onFinish}
      autoComplete="off"
      form={form}
      validateMessages={{
        required: "Cannot be empty",
      }}
    >
      <Form.Item name="todoTitle" rules={[{ required: true }]}>
        <Input.TextArea size="large" placeholder="Add new todo" />
      </Form.Item>

      <Form.Item>
        <Button type="default" htmlType="submit" size="middle">
          <PlusSquareOutlined />
          Add todo
        </Button>
      </Form.Item>
    </Form>
  );
};
