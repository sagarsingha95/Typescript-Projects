import type { Task } from "../types/task";

type TaskItemProps = {
    task:Task;
    handleCompleted:(id:number) =>void;
    handleDelete:(id:number) =>void;
};

const TaskItem = ({task,handleCompleted,handleDelete}:TaskItemProps) => {
  return (
    <div className="flex gap-5">
        <span>{task.id}</span>
        <h3>{task.title}</h3>
        <input type="checkbox" checked={task.completed} onChange={()=>handleCompleted(task.id)}/>
        <p className={task.completed ? "line-through text-green-500":"text-amber-300"}>{task.completed?"Completed":"Pending"}</p>
        <button onClick={()=>handleDelete(task.id)}>Delete</button>
    </div>
  )
}

export default TaskItem