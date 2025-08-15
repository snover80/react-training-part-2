import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Query client is the object we use for managing and caching remote date and react query
/*
React Query default options:

retry: 3 by default it retries 3 times
cacheTime: 300_000 // 5m -> Si el query no tiene ningun observer es decir, que ningun componente esta usando ese query en el momento
  Automaticamente pasado este tiempo el query se determina inactivo y será removido de la cache (garbage collector)
staleTime: 0 -> Cuanto tiempo la data se considera "fresca", por defecto 0 indica que una vez obtenida la data ya se considera data vieja. Esta data se actualizará en 3 momentos distintos:
 1. Cunado volvamos a hacer focus en la pantalla, es decir abrimos una nueva pestaña y volvemos, la data se actualizará automaticamente
 2. Cuando volvamos a tener conexión a internet.
 3. Cuando el componente es "montado", quiere decir que una vez se muestra el componente en pantalla haga el fetch del query
 Todas estas caracteristicas se pueden deshabilitar con las siguientes configuraciones
refetchOnWindowFocus: false
refetchOnReconnect: false
refetchOnMount: false
*/

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
