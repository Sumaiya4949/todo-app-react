import { Fragment } from "react";
import { TodoAddForm } from "../components/TodoAddForm";
import { TodoList } from "../components/TodoList";
import { useTodoList } from "../hooks/useTodoList";
import styles from "../styles/MyTodos.module.scss";

/**
 * React component to visualize the my todos page
 * @returns {JSX} JSX of the my todos page
 */
export const MyTodos = () => {
  const { addNewTodo, myTodos, removeTodoById, changeTodoStatus } =
    useTodoList();

  return (
    <Fragment>
      <TodoAddForm className={styles.todoForm} addTodo={addNewTodo} />
      <TodoList
        todos={myTodos}
        removeTodoById={removeTodoById}
        changeTodoStatus={changeTodoStatus}
      />
    </Fragment>
  );
};
