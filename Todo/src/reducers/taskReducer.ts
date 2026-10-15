import type { Task } from "../types/task";

type TaskAction =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: number }
  | { type: "TOGGLE_TASK"; payload: number }
  | { type: "MARK_ALL_COMPLETE"}
  | { type: "CLEAR_TASKS" };

export function loadTask():Task[]{
  const stored = localStorage.getItem("tasks");
  if(!stored){
    return []
  };
  try{
    const parsed:unknown = JSON.parse(stored);
    if(!Array.isArray(parsed)){
      return []
    };
    return parsed.filter((item):item is Task=>{
      if(typeof item !=="object" || item == null){
        return false;
      }

      return (
                "id" in item &&
        typeof item.id === "number" &&
        "title" in item &&
        typeof item.title === "string" &&
        "completed" in item &&
        typeof item.completed === "boolean"
      )
    })
  }catch{
    return []
  }
}

function assertNever(value:never):never{
  throw new Error(`Unhandled Action : ${JSON.stringify(value)}`)
}

export function taskReducer(state:Task[],action:TaskAction){
  switch(action.type){
    case "ADD_TASK":
      return [...state,action.payload];
    case "DELETE_TASK":
      return state.filter((task)=> task.id !== action.payload);
    case "TOGGLE_TASK":
      return state.map((task)=> task.id === action.payload ? {...task,completed:!task.completed}:task)
    case "CLEAR_TASKS":
      return [];
    case "MARK_ALL_COMPLETE":
      return state.map((task)=>({
        ...task,
        completed:true
      }));
    default:
      return assertNever(action);
  }
}


