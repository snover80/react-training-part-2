import { Navigate, Outlet } from "react-router-dom";
import UserListPage from "./UserList";
import UserList from "./UserList";
import useAuth from "./hooks/useAuth";

function UsersPage() {
  return (
    <div className="row">
      <div className="column">
        <UserList />
      </div>
      <div className="column">
        <Outlet />
      </div>
    </div>
  );
}

export default UsersPage;
