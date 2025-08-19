import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  pageSize: number;
}

const usePostsInfiniteQuery = (queary: PostQuery) => {
  // Infinite queries handle pagination automatically, so no need to keep track of the page using an state variable
  /*
  pageParam: Es un parametro que existe dentro del objeto que retorna getNextPageParam. Lo que hicimos fue un destructuring de ese objeto.
  Dentro del infinite loop, necesitamos colocar el parametro initialPageParam, el cual como su nombre lo indica, la pagina en la cual empezamos
   */
  return useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", queary],
    queryFn: ({ pageParam }) =>
      axios
        .get<Promise<Post[]>>("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _start: pageParam,
            _limit: queary.pageSize,
          },
        })
        .then((res) => res.data),
    staleTime: 1 * 60 * 1000,
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    // All pages contiene todas las paginas que nosotros hemos obtenido del backend
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });
};

export default usePostsInfiniteQuery;

/*
REACT CODE

const PostList = () => {
  const pageSize = 10;
  const {
    data: posts,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = usePostsInfiniteQuery({ pageSize });

  if (isLoading) return <span className="spinner-border" />;
  if (error) return <p>{error.message}</p>;

  Aqui es importante tener en cuenta lo siguiente:
  Ahora posts no retorna un array de Posts, en su lugar retorna un objeto con las paginas y los pageParams. Cada page tendra en este caso un array con la lista de objetos que necesitamos

  useInfiniteQuery, tambien retorna dos variables bastante utiles:
  1. fetchNextPage -> esta es una función callback, la cual nos permite automaticamente hacer el llamado de la funcion getNextPageParam dentro de useInfiniteQuery, lo cual retornará la siguiente pagina y se ejecutara el fetc.
  2. isFetchingNextPage -> El cual es basicamente un boolean que nos indica si esta obteniendo la data de la siguiente pagina.
  return (
    <>
      <ul className="list-group">
        {posts?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <button
        disabled={isFetchingNextPage}
        className="btn btn-primary my-3"
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage ? "Loading..." : "Load more"}
      </button>
    </>
  );
};

export default PostList;

*/
