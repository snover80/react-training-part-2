import { ReactNode, useReducer } from "react";
import AuthContext from "./authContext";

interface LoginUser {
  type: "LOGIN";
  user: string;
}

interface LogoutUser {
  type: "LOGOUT";
}

export type AuthAction = LoginUser | LogoutUser;

// Un reducer basicamente nos permite
const authReducer = (user: string, action: AuthAction): string => {
  if (action.type === "LOGIN") return action.user;
  if (action.type === "LOGOUT") return "";
  return user;
};

interface AuthProviderProps {
  children: ReactNode;
}
function AuthProvider({ children }: AuthProviderProps) {
  const [user, dispatch] = useReducer(authReducer, "");
  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
