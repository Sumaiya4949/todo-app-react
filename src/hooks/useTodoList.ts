import { useCallback, useEffect, useMemo, useState } from "react";
import { TaskType } from "../types";

export const useTodoList = () => {
  // Load todos from local storage
  const initialTodos: TaskType[] = useMemo(() => {
    return JSON.parse(localStorage.getItem("todos") || "[]");
  }, []);

  const [myTodos, setMyTodos] = useState<TaskType[]>(initialTodos);

  /**
   * Effect to save todos to local storage when todos change
   * @description
   *  - Saves the todos to local storage as JSON string.
   */
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(myTodos));
  }, [myTodos]);

  /**
   * Add new todo to the todo list
   * @description
   *  - Saves the new todo in the state.
   * @param {TaskType} task Task which should be added
   */
  const addNewTask = useCallback((task: TaskType): void => {
    setMyTodos((prev) => {
      return [...prev, task];
    });
  }, []);

  /**
   * Remove task by id from todo list
   * @description
   *  - Removes todo from the state.
   * @param {string} id Id of the task which should be removed
   */
  const removeTaskById = useCallback((id: string): void => {
    setMyTodos((prev) => {
      return prev.filter((task) => task.id != id);
    });
  }, []);

  /**
   * Change checked status of this task by id
   * @description
   *  - Checks or unchecks todo from state.
   * @param {string} id Id of the task which should be checked or unchecked
   * @param {boolean} isDone Flag to determine if the task should be checked or unchecked
   */
  const changeTaskStatus = useCallback((id: string, isDone: boolean): void => {
    setMyTodos((prev) => {
      return prev.map((task) => {
        if (task.id !== id) {
          return task;
        }
        return { ...task, isDone };
      });
    });
  }, []);

  return { addNewTask, myTodos, removeTaskById, changeTaskStatus };
};
