import "./App.css";
import AuthProvider from "./state-management/auth/AuthProvider";
import CounterZustand from "./state-management/counter/CounterZustand";

import HomePage from "./state-management/HomePage";
import NavBar from "./state-management/NavBar";
import TasksProvider from "./state-management/tasks/TasksProvider";

function App() {
  return (
    <>
      <TasksProvider>
        <CounterZustand />
        <NavBar />
        <HomePage />
      </TasksProvider>
    </>
  );
}

export default App;
