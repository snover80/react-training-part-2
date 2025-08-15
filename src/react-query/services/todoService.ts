import { APIClient } from "./api-client";

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const todoServiceClient = new APIClient<Todo>("/todos");

export default todoServiceClient;
