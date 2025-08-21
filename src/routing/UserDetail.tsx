import { useParams, useSearchParams } from "react-router-dom";

const UserDetail = () => {
  /**
   * Con useParams() podemos obtener los parametros de la url
   */
  const params = useParams();

  // useSearchParams() podemos obtener los parametros y tambien actualizar los query params
  // Como en el useState, obtenemos dos elementos, el primero todos los params en el segundo una funcion para actualizarlos
  const [searchParam, setSearchParam] = useSearchParams();
  console.log(searchParam.get("name")); // Retorna el valor del query param name e.g users/1?name=alice
  return <p>User {params.id}</p>;
};

export default UserDetail;
