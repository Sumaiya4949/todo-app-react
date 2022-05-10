import { useCallback, useEffect, useMemo, useState } from "react";
import { TodoType } from "../types";

/**
 * React custom hook to management of todo list
 * @returns {object} Todo list and some functions to add, remove and check/uncheck funtionality
 */
export const useTodoList = () => {
  // Load todos from local storage
  // const initialTodos: TodoType[] = useMemo(() => {
  //   return JSON.parse(localStorage.getItem("todos") || "[]");
  // }, []);

  const [myTodos, setMyTodos] = useState<TodoType[]>([]);

  /**
   * Effect to save todos to local storage when todos change
   * @description
   *  - Saves the todos to local storage as JSON string.
   */
  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(myTodos));
  // }, [myTodos]);

  /**
   * Add new todo to the todo list
   * @description
   *  - Saves the new todo in the state.
   * @param {TodoType} todo todo which should be added
   */
  const addNewTodo = useCallback((todo: TodoType): void => {
    setMyTodos((prev) => {
      return [...prev, todo];
    });
  }, []);

  /**
   * Remove todo by id from todo list
   * @description
   *  - Removes todo from the state.
   * @param {string} id Id of the todo which should be removed
   */
  const removeTodoById = useCallback((id: string): void => {
    setMyTodos((prev) => {
      return prev.filter((todo) => todo.id != id);
    });
  }, []);

  /**
   * Change checked status of this todo by id
   * @description
   *  - Checks or unchecks todo from state.
   * @param {string} id Id of the todo which should be checked or unchecked
   * @param {boolean} isDone Flag to determine if the todo should be checked or unchecked
   */
  const changeTodoStatus = useCallback((id: string, isDone: boolean): void => {
    setMyTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }
        return { ...todo, isDone };
      });
    });
  }, []);

  return { addNewTodo, myTodos, removeTodoById, changeTodoStatus };
};
