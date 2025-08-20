import { create } from "zustand";

interface CounterStore {
  counter: number;
  max: number;
  increment: () => void;
  reset: () => void;
}

// Este se usa para reemplazar 1 el reducer y 2 el context.
/**
 * El reducer en que sentido, simplificamos la lógica en una sola funcion que me permite manejar el estado de un componente
 * El context en que sentido, puedo importar este store dentro de distintos componentes y voy a obtener el contexto de lo que ha pasado
 *
 *
 * Ahora como funciona, muy parecido al reducer, definimos una interfaz con las cosas que queremos utlizar en el reducer
 * El estado actual, en este caso el counter
 * una funcion para incrementar el counter
 * una funcion para resetear el counter
 *
 *
 * Ahora dentro de la función utilizamos una funcion llamada set que nos permitirá hacer el seteo de nuestro counter
 * Esta funcion tiene como parametro un store el cual va a retornar el valor actual de nuestro counter o estado
 */
const useCounterStore = create<CounterStore>((set) => ({
  counter: 0,
  max: 5,
  increment: () => {
    set((store) => ({ counter: store.counter + 1 }));
  },
  reset: () => set(() => ({ max: 10 })),
}));

export default useCounterStore;
