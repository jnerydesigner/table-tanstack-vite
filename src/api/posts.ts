import type { PostsDTO } from "@/types/posts-dto.type";
import { AxiosCall } from "./axios";

export const createPost = async (post: PostsDTO): Promise<PostsDTO> => {
  const response = await AxiosCall.post("/posts", post);
  return response.data;
};

export const getPosts = async (): Promise<PostsDTO[]> => {
  const response = await AxiosCall.get("/posts");
  return response.data;
};
