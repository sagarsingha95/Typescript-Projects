import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import type { Task } from "./types/task";
// import useLocalStorage from "./hooks/useLocalStorage";
import TaskList from "./components/TaskList";
import FormSubmission from "./components/FormSubmission";
import TaskStats from "./components/Taskstats";
import Card from "./components/Card";
import { Section } from "./components/Section";
import { useReducer } from "react";
import { taskReducer,loadTask } from "./reducers/taskReducer";
import { useTheme } from "./context/ThemeContext";

// function isTask(value: unknown): value is Task {
//   if (typeof value !== "object" || value === null) {
//     return false;
//   }
//   return (
//     "id" in value &&
//     typeof value.id === "number" &&
//     "title" in value &&
//     typeof value.title === "string" &&
//     "completed" in value &&
//     typeof value.completed === "boolean"
//   );
// }

const App = () => {
  // const [tasks, setTasks] = useLocalStorage<Task[]>(
  //   "tasks",
  //   [],
  //   (value): value is Task[] => Array.isArray(value) && value.every(isTask),
  // );
  const [title, setTitle] = useState<string>("");
  const [tasks,dispatch] = useReducer(taskReducer,undefined,loadTask);
  const {theme,toggleTheme} = useTheme();

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
    dispatch({type:"ADD_TASK",payload:x})

    console.log(localStorage.getItem("tasks"));
    setTitle("");
    ref.current?.focus();
  }

  function handleCompleted(id: number) {
    dispatch({type:"TOGGLE_TASK",payload:id})
  }

  function handleDelete(id: number) {
    dispatch({type:"DELETE_TASK",payload:id})
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
    dispatch({type:"CLEAR_TASKS"})
  }

  useEffect(() => {
    document.title = `Todo - ${tasks.length} list`;
  }, [tasks]);

  useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

  useEffect(()=>{
    document.body.style.background = `${theme === "light"? "black":"white"}`;
    document.body.style.color = `${theme === "light"? "white":"black"}`;
    
  },[theme])

  // useEffect(()=>{
  //   const x = setInterval(()=>{
  //     console.log("Hello");
  //   },1000)

  //   return () =>{
  //     clearInterval(x);
  //   }
  // },[])

  return (
    <div className={`min-h-screen p-4 transition-colors duration-300 ${
    theme === "light"
      ? "bg-white text-gray-900"
      : "bg-gray-900 text-white"
  }`}>
      <button className={theme === "light" ? "p-2 bg-stone-700 shadow-2xl":"p-2 bg-stone-300 shadow-2xl"} onClick={toggleTheme}>{theme === "light"? "DarkMode" : "LightMode"}</button>
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
      <button className="p-2 bg-green-500" onClick={()=>dispatch({type:"MARK_ALL_COMPLETE"})}>Complete ALL</button>
    </div>
  );
};

export default App;
