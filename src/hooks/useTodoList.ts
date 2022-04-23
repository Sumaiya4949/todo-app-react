
import { useCallback, useEffect, useMemo, useState } from "react";
import { TaskType } from "../types";

export const useTodoList = () => {
  const initialTodos: TaskType[] = useMemo(() => {
    return JSON.parse(localStorage.getItem("todos") || "[]");
  }, []);

  const [myTodos, setMyTodos] = useState<TaskType[]>(initialTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(myTodos));
  }, [myTodos]);

  const addNewTask = useCallback((task: TaskType): void => {
    setMyTodos((prev) => {
      return [...prev, task];
    });
  }, []);

  const removeTaskById = useCallback((id: string): void => {
    setMyTodos((prev) => {
      return prev.filter((task) => task.id != id);
    });
  }, []);

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
 
  return {addNewTask, myTodos, removeTaskById, changeTaskStatus}
}