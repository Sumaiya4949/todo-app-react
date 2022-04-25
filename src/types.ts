export type TaskType = {
  isDone: boolean;
  title: string;
  id: string
};

export type TaskRemover = (id: string) => void

export type TaskStatusChanger = (id: string, isDone: boolean) => void

export type TodoContextType = {
  myTodos : TaskType[];
  addNewTask: (task:TaskType) => void
  removeTaskById: (id: string) => void
  changeTaskStatus: (id: string, isDone: boolean) => void
}