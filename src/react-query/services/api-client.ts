import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (): Promise<T[]> => {
    const res = await axiosInstance.get<T[]>(this.endpoint);
    return res.data;
  };

  post = async (postObject: T): Promise<T> => {
    const res = await axiosInstance.post<T>(this.endpoint, postObject);
    return res.data;
  };
}
