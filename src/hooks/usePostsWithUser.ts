import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const usePostsWithUser = (userId: number | undefined) => {
  /* En nuestro queryKe, estamos siguiendo una estructura que representa lo que sería un endpoint
        /users/{userId}/posts
    Cada vez que el userId cambie, react queary va a hacer el fetch de los posts correspondientes al userID que especificamos.
    Esto lo que nos da a entender es un comportamiento similar al array que pasabamos en useEffect((), []) en donde cada dependencia
    hacía que se ejecutara nuevamente el useEffect
 */
  return useQuery<Post[], Error>({
    queryKey: userId ? ["users", userId, "posts"] : ["posts"],
    queryFn: () =>
      axios
        .get<Promise<Post[]>>("https://jsonplaceholder.typicode.com/posts", {
          params: {
            userId,
          },
        })
        .then((res) => res.data),
  });
};

export default usePostsWithUser;
