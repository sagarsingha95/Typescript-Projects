import TaskItem from "./components/TaskItem"
import type { Task } from "./types/task";


const App = () => {
  const tasks:Task[]= [
    {
      id:1,
      title:"Wake up",
      completed:true
    },
    {
      id:2,
      title:"Breakfast",
      completed:true
    },
    {
      id:3,
      title:"Go to work",
      completed:false
    },

  ]


  return (
    <div>
      {tasks.map((item)=>(
        <div key={item.id}>
          <TaskItem task={item}/>
        </div>
      ))}
    </div>
  )
}

export default App