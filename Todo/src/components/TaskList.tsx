import type { Task } from "../types/task"
import TaskItem from "./TaskItem";

type TaskListProps = {
    tasks:Task[];
    handleCompleted:(id:number)=>void;
    handleDelete:(id:number)=>void;
}

const TaskList = ({tasks,handleCompleted,handleDelete}:TaskListProps) => {
  return (
    <ul>
        {tasks.map((item)=>(
            <li key={item.id} className="mb-3">
                <TaskItem task={item} handleCompleted={handleCompleted} handleDelete={handleDelete}/>
            </li>
        ))}
    </ul>
  )
}

export default TaskList