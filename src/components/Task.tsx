import { TaskType } from "../types";

type PropType = {
  task: TaskType;
  sl: number;
};

export const Task = (props: PropType) => {
  const { task, sl } = props;
  return (
    <div>
      {task.title} {sl}
    </div>
  );
};
