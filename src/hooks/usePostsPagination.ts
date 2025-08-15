import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  page: number;
  pageSize: number;
}

const usePostsPagination = (queary: PostQuery) => {
  return useQuery<Post[], Error>({
    queryKey: ["posts", queary],
    queryFn: () =>
      axios
        .get<Promise<Post[]>>("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _start: queary.page,
            _limit: queary.pageSize,
          },
        })
        .then((res) => res.data),
    staleTime: 1 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};

export default usePostsPagination;
