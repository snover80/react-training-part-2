import { Dispatch } from "react";
import { Task } from "./TaskList";

import React from "react";
import { TaskAction } from "./TasksProvider";

interface TasksContextType {
  tasks: Task[];
  dispatch: Dispatch<TaskAction>;
}

// Antoriormente ....

/**
 * En la primera parte del curso vimos que para poder compartir el estado de un componente entre diferentes components lo debiamos mover a un padre,
 * para luego pasarlo como parametro a los hijos hasta llegar al componente en donde se tenia que renderizar la info.
 *
 * Esto causa un gran problema porque tenemos que empezar a agregar y agregar interfaces retornando void y elementos en componentes que no estan directamente
 * implicados o no necesitamos. Es por eso que existe algo que se llama el context.
 *
 * Dentro de este context creamos una interface con lo que usa nuestro context, el primer es el objeto que queremos compartir o que recibimos y como segundo objeto la function que actualiza ese objeto
 * En este caso particular que estamos usando reducer, pasamos el tipo de fn Dispath de tipo TaskAction que es definido en nuestro reducer
 * sin embargo no es necesario siempre usar reducer y lo puedemos usar con useState retornando una funcion void
 */

const TaskContext = React.createContext<TasksContextType>(
  {} as TasksContextType
);

export default TaskContext;
