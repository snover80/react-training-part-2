import { useContext } from "react";
import LoginStatusZustand from "./auth/LoginStatusZustand";
import useCounterStore from "./counter/store";
import TaskContext from "./tasks/taskContext";

const NavBar = () => {
  const { tasks } = useContext(TaskContext);
  const counter = useCounterStore((s) => s.counter);
  return (
    <nav className="navbar d-flex justify-content-between">
      <span className="badge text-bg-secondary">{counter}</span>
      <LoginStatusZustand />
    </nav>
  );
};

export default NavBar;
