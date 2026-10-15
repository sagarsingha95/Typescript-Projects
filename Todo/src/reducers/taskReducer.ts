import type { Task } from "../types/task";

type TaskAction =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: number }
  | { type: "TOGGLE_TASK"; payload: number }
  | { type: "CLEAR_TASKS" };

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
    default:
      return state;
  }
}


