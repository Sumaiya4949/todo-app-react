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
      return {
        myTodos: [...state.myTodos, payload],
      };
    }

    default:
      return state;
  }

  return state;
};
