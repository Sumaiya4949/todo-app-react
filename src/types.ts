export type TodoType = {
  isDone: boolean;
  title: string;
  id: string;
};

export type TodoRemover = (id: string) => void;

export type TodoStatusChanger = (id: string, isDone: boolean) => void;
