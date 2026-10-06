import type { Task } from "../types/task";

type TaskItemProps = {
    task:Task;
};

const TaskItem = ({task}:TaskItemProps) => {
  return (
    <div>
        <h3>{task.title}</h3>
        <p>{task.completed?"Completed":"Pending"}</p>
    </div>
  )
}

export default TaskItem