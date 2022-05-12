export type TodoType = {
  isDone: boolean;
  title: string;
  id: string;
  creationTime: number;
};

export type TodoRemover = (id: string) => void;

export type TodoStatusChanger = (id: string, isDone: boolean) => void;

export type User = {
  id: string;
  fullname: string;
};
