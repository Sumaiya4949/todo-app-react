import { createContext, useState, useMemo, useCallback } from "react";
import { TodoContextType, TaskType } from "../types";

export const TodoContext = createContext<TodoContextType>({
  myTodos: [],
  addNewTask: () => {},
  removeTaskById: () => {},
  changeTaskStatus: () => {},
});

type PropType = {
  children: React.ReactChild;
};

export const TodoProvider = (props: PropType) => {
  const { children } = props;

  const initialTodos: TaskType[] = useMemo(() => {
    return JSON.parse(localStorage.getItem("todos") || "[]");
  }, []);

  const [myTodos, setMyTodos] = useState<TaskType[]>(initialTodos);

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

  return (
    <TodoContext.Provider
      value={{
        myTodos,
        addNewTask,
        removeTaskById,
        changeTaskStatus,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
