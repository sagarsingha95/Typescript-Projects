import { useState } from "react";
import TaskItem from "./components/TaskItem";
import type { Task } from "./types/task";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Wake up",
      completed: true,
    },
    {
      id: 2,
      title: "Breakfast",
      completed: true,
    },
    {
      id: 3,
      title: "Go to work",
      completed: false,
    },
  ]);
  const [title, setTitle] = useState<string>("");
  // const [completed,setCompleted] =useState<boolean>(false);

  function handleAdd(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (title.trim() === "") {
      alert("Please add a todo first");
      return;
    }
    const x: Task = {
      id: tasks.length + 1,
      title: title.trim(),
      completed: false,
    };
    setTasks([...tasks, x]);
    setTitle("");
  }

  function handleCompleted(id: number) {
    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  }

  function handleDelete(id: number) {
    setTasks(tasks.filter((x) => x.id !== id));
  }
  const completedTask = () =>
    tasks.filter((item) => item.completed === true).length;
  const pendingTask = () =>
    tasks.filter((item) => item.completed === false).length;

  return (
    <div>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          className="border-2 rounded-2xl"
        />
        <button type="submit" className="border-2 p-2">
          Submit
        </button>
      </form>

      {tasks.map((item) => (
        <ul key={item.id}>
          <li>
            {
              <TaskItem
                task={item}
                handleCompleted={handleCompleted}
                handleDelete={handleDelete}
              />
            }
          </li>
        </ul>
      ))}
      <p>Completed Task: {completedTask()}</p>
      <p>Pending Task: {pendingTask()}</p>
      <p>Total Task: {tasks.length}</p>
    </div>
  );
};

export default App;
