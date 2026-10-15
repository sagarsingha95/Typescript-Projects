import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import type { Task } from "./types/task";
import useLocalStorage from "./hooks/useLocalStorage";
import TaskList from "./components/TaskList";
import FormSubmission from "./components/FormSubmission";
import TaskStats from "./components/Taskstats";
import Card from "./components/Card";
import { Section } from "./components/Section";

function isTask(value: unknown): value is Task {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  return (
    "id" in value &&
    typeof value.id === "number" &&
    "title" in value &&
    typeof value.title === "string" &&
    "completed" in value &&
    typeof value.completed === "boolean"
  );
}

const App = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>(
    "tasks",
    [],
    (value): value is Task[] => Array.isArray(value) && value.every(isTask),
  );
  const [title, setTitle] = useState<string>("");

  const ref = useRef<HTMLInputElement>(null);

  function handleAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (title.trim() === "") {
      alert("Please add a todo first");
      return;
    }
    const x: Task = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };
    setTasks([...tasks, x]);

    console.log(localStorage.getItem("tasks"));
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

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleClear() {
    setTasks([]);
  }

  useEffect(() => {
    document.title = `Todo - ${tasks.length} list`;
  }, [tasks]);

  // useEffect(()=>{
  //   const x = setInterval(()=>{
  //     console.log("Hello");
  //   },1000)

  //   return () =>{
  //     clearInterval(x);
  //   }
  // },[])

  return (
    <div className="p-4 ">
      <Card>
        <FormSubmission
          title={title}
          handleChange={handleChange}
          handleAdd={handleAdd}
          ref={ref}
        />
      </Card>
      <Section title={"My task"}>
          <p>Learn React with TypeScript.</p>
  <p>Practice building projects.</p>
      </Section>
      <div>
        {
          <TaskList
            tasks={tasks}
            handleCompleted={handleCompleted}
            handleDelete={handleDelete}
          />
        }
      </div>
        <Card>

      <TaskStats
        total={tasks.length}
        completed={completedTask}
        pending={pendingTask}
      />
        </Card>
      <button className="p-2 bg-stone-400" onClick={handleClear}>
        Clear All
      </button>
    </div>
  );
};

export default App;
