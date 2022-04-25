export type TaskType = {
  isDone: boolean;
  title: string;
  id: string
};

export type TaskRemover = (id: string) => void

export type TaskStatusChanger = (id: string, isDone: boolean) => void

export type Action = {
  type: string;
  payload : any;
}

export type AppState = {
  myTodos: TaskType[];
}