import { useReducer, useState } from "react";
import counterReducer from "./counterReducer";

const Counter = () => {
  // const [value, setValue] = useState(0);
  // En este componente teniamos dos lugares en donde estabamos actualizando el useState
  // Entre más grandes nuestros componentes y actualicemos el state, es más propenso a errores
  // Por ende useReducer nos permite encapsular toda la logica del cambio del state fuera del componente en un unico sitio.

  //Nuestra funcion useReducer, recibe dos parametros. El primero es nuestra funcion reducer o nuestra funcion que procesa toda la logica
  // en nuestro caso counterReducer que creamos en el otro archivo, el segundo argumento es nuestro state inicial
  // Esto retorna un array, con el valor actual y una funcion llamada dispatch que nos permitira hacer el set
  const [value, dispatch] = useReducer(counterReducer, 0);
  return (
    <div>
      Counter ({value})
      <button
        onClick={() => dispatch({ type: "INCREMENT" })}
        className="btn btn-primary mx-1"
      >
        Increment
      </button>
      <button
        onClick={() => dispatch({ type: "RESET" })}
        className="btn btn-primary mx-1"
      >
        Reset
      </button>
    </div>
  );
};

export default Counter;
