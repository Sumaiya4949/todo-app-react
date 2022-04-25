import { Action, AppState, TaskType } from "../types";

export const ACTION_ADD_TODO: string = "ACTION_ADD_TODO";
export const ACTION_REMOVE_TODO: string = "ACTION_REMOVE_TODO";
export const ACTION_DO_TODO: string = "ACTION_DO_TODO";
export const ACTION_UNDO_TODO: string = "ACTION_UNDO_TODO";

export const initialAppState: AppState = {
  myTodos: JSON.parse(localStorage.getItem("todos") || "[]"),
};

export const todoReducer = (state: AppState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_ADD_TODO: {
      const { task } = payload;
      return {
        myTodos: [...state.myTodos, task],
      };
    }

    case ACTION_REMOVE_TODO: {
      const { id } = payload;
      return {
        myTodos: state.myTodos.filter((task) => task.id !== id),
      };
    }

    case ACTION_DO_TODO: {
      const { id } = payload;
      return {
        myTodos: state.myTodos.map((task) => {
          if (task.id !== id) {
            return task;
          }
          return { ...task, isDone: true };
        }),
      };
    }

    case ACTION_UNDO_TODO: {
      const { id } = payload;
      return {
        myTodos: state.myTodos.map((task) => {
          if (task.id !== id) {
            return task;
          }
          return { ...task, isDone: false };
        }),
      };
    }

    default:
      return state;
  }

  return state;
};
