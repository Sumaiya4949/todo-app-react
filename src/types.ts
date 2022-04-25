export type TaskType = {
  isDone: boolean;
  title: string;
  id: string;
};

export type TaskRemover = (id: string) => void;

export type TaskStatusChanger = (id: string, isDone: boolean) => void;

type ActionPayload = TaskType;

export type Action = {
  type: string;
  payload: ActionPayload;
};

export type AppState = {
  myTodos: TaskType[];
};
