import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../react-query/constants";

import todoServiceClient, { Todo } from "../react-query/services/todoService";

/*
  queryKey is an unique identifier, everytime we want to cache data we reference this key
  queryFn this is the function we use to fetch the data from the backend, the function must return data or an error
   


  data: todos -> Hacemos un de-structuring el objeto data lo renombramos con : a todo
  error -> Es el objeto de error que retorna useQuery, sin embargo. Debemos especificar que tipo de dato es para obtener el mensaje y evitar TS errors
  */

const useTodos = () => {
  return useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: todoServiceClient.getAll,
  });
};

export default useTodos;
