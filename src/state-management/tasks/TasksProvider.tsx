import { ReactNode, useReducer } from "react";
import TaskContext from "./taskContext";

import { Task } from "./TaskList";

interface TaskAdd {
  type: "ADD";
  task: Task;
}

interface TaskDelete {
  type: "DELETE";
  taskId: number;
}

export type TaskAction = TaskAdd | TaskDelete;

const tasksReducer = (currentTasks: Task[], action: TaskAction): Task[] => {
  if (action.type === "ADD") {
    return [action.task, ...currentTasks];
  }

  if (action.type === "DELETE")
    return currentTasks.filter((t) => t.id !== action.taskId);
  return currentTasks;
};

interface TasksProviderProps {
  children: ReactNode;
}

function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export default TasksProvider;
