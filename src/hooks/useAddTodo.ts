import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../react-query/constants";
import todoServiceClient from "../react-query/services/todoService";
import { Todo } from "../react-query/services/todoService";

interface AddTodoContext {
  previousTodos: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  // Para poder typear nuestro useMutation tenemos los siguientes parametros
  // 1. El objeto tipo de objeto que recibimos, en este caso un Todo
  // 2. El Error handler
  // 3. El objeto que enviamos al request, en este caso es un todo, no siempre sera el caso que lo que enviamos es lo mismo que recibimos pero será lo mas frecuente
  // 4. Un contexto, este contexto nos sirve para retornar los todos existentes antes de que sean actualizados
  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: todoServiceClient.post,

    // Esta funcion onMutate es ejecutada incluso antes que mutationFn
    onMutate: (newTodo: Todo) => {
      // Necesitamos generar un contexto, lo cual lo podemos hacer con el return the onMutate. Esto nos servirá para en caso de fallo o error tengamos la data original antes de hacer el update
      // Recordemos que estamos trabajando con optimistic updates que basicamente tratan de mostrarle la data actualizada al usuario antes de que esta sea incluso procesada en el backend es por ello que en caso de fallo debemos tener la data original
      const previousTodos =
        queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos = []) => [
        newTodo,
        ...todos,
      ]);

      onAdd();
      return { previousTodos };
    },
    onSuccess: (savedTodo, newTodo) => {
      /* En este metodo de on sucess, es donde vamos a actualiar la data que se muestra en pantalla
      la opción ideal va a ser la opción 1. Sin embargo jsonplaceholder tiene una limitante y es que el post responde con un mensaje fake
      simple y sencillamente si nosotros hacemos un refetch de la data no se va a retornal el todo creado. Esto no es un error de useMutation
      sino una limitante de nuestro objeto de prueba. En un programa real se espera que esto no pase es por ello que se usará la opcion 2.
      */

      // 1. Primera opción. Es básicamente obtener nuestro queryClient he invalidar el queryKey que necesitamos, que quiere decir esto, le estamos
      // diciendo a la cache que ese queryKey ya no es valido, lo que causará automaticamente un refetch de ese query y actualizará la data en cache.
      // Lo podemos evidenciar en el network luego de hacer el post automaticamente hace el refetch de la data.
      /*queryClient.invalidateQueries({
        queryKey: CACHE_KEY_TODOS,
      });*/

      // 2. Segunda opcion, actualizar la data directamente en la cache,
      // En este caso utilizamos el setQueryData, en donde lo typeamos para recibir un tipo todo
      // Como primer argumento recibe el queryKey que queremos actualizar y su segundo argumento es una funcion
      // En esta funcion recibimos los todos existentes y adicional a ello adicionamos el savedTodo.
      // Lo encapsulamos porque todos puede ser undefined asi que retornamos lo existente sino un [] vacio
      // queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) => [
      //   savedTodo,
      //   ...(todos || []),
      // ]);

      //En esta tercera implementacion es un paso mas avanzado en el curso el cual se llama optimistic updates,
      // en este caso le mostramos al usuario de manera rapida que se actualizo la información colocando la info que el puso en el form y la desplegamos
      // luego tras bambalinas ejecutamos todo el proceso del post. Si el post es exitoso entrará a este metodo onSucess
      // lo que hacemos en este caso básicamente es, inicialmente pusimos un todo "falso" en el cache, ahora que recibimos el todo verdadero lo que hacemos es actualizarlo con este
      // generalmente esta actualización incluira el id, que es lo que se genera en el backend de resto sera todo igual

      // A nivel de código que estamos haciendo, todos retorna una lista de todos, la cual iteramos para obtener cada todo de la lista
      // Ahora recordemos que esta funcion de onSucess, recibe dos parametros, el nuevo objeto que se obtiene del post (savedTodo) y como segundo parametro el todo (objeto) -newTodo- que enviamos en dicho post request
      // por lo cual comparamos si el todo de nuestra lista es igual al todo que enviamos como objeto es decir va a tener id:0 entonces reemplacelo con el savedTodo de lo contratio conserve el todo que tiene
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
    },
    // En el on error recibimos tres parametros, error, el nuevo objeto que creamos y el contexto que es retornado en el onMutate
    // En caso de error, restauramos la data a su estado original
    onError: (error, newTodo, context) => {
      if (!context) return;
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, context.previousTodos);
    },
  });
};

export default useAddTodo;
