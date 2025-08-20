interface Action {
  type: "INCREMENT" | "RESET";
}

/*
Nuestra funcion reducer tiene dos parametros, el primero es el current state (Es decir el valor actual en nuestro state)
El segundo parametro es una accion. Esta acion es un objeto que describe que debemos hacer cuando el reducer sea invocado
En nuestro caso la accion es un string typeado pero puede ser cualquier cosa. Asi mismo escribimos el tipo de dato que retorna la accion.
 */
const counterReducer = (currentState: number, action: Action): number => {
  if (action.type === "INCREMENT") return currentState + 1;
  if (action.type === "RESET") return 0;
  return currentState;
};

export default counterReducer;
