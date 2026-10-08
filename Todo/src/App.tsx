import { useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent } from "react";
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
  const ref = useRef<HTMLInputElement>(null);


  function handleAdd(e:FormEvent<HTMLFormElement>) {
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
    ref.current?.focus();
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
    ref.current?.focus();
  }
  const completedTask = () =>
    tasks.filter((item) => item.completed === true).length;
  const pendingTask = () =>
    tasks.filter((item) => item.completed === false).length;

  function handleChange(e:ChangeEvent<HTMLInputElement>){
    setTitle(e.target.value);
  };
  function handleKeyDown(e:KeyboardEvent<HTMLInputElement>){
    console.log(e.key);
    if(e.key === "Escape"){
      setTitle("");
    };
  };

  function handleClear(){
    setTasks([]);
  }

  return (
    <div className="p-4">
      <form onSubmit={handleAdd}>
        <input
          type="text"
          onChange={handleChange}
          value={title}
          onKeyDown={handleKeyDown}
          className="shadow-2xs p-2 focus:outline-none"
          ref={ref}
        />
        <button type="submit" className="bg-blue-500 p-2 rounded-xs ml-4 cursor-pointer active:translate-y-1 " >
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
      <button className="p-2 bg-stone-400" onClick={handleClear}>Clear All</button>
    </div>
  );
};

export default App;
