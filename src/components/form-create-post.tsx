import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { BaseSyntheticEvent } from "react";

import { z } from "zod";
import { Button } from "./ui/button";
import { v4 as uuidv4 } from "uuid";
import type { PostsDTO } from "@/types/posts-dto.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/api/posts";
import { toast } from "sonner";

const postSchema = z.object({
  title: z.string(),
  summary: z.string(),
  urlImg: z.string().url(),
});

type PostType = z.infer<typeof postSchema>;

export const FormCreatePost = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-post"],
    mutationFn: async (postCreate: PostsDTO) => {
      try {
        return await createPost(postCreate);
      } catch (e) {
        toast.error("Erro ao criar o post.");
        console.error(e);
        throw e;
      }
    },
    onSuccess: () => {
      toast.success("Post criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["data-posts"] });
    },
  });
  const { register, handleSubmit } = useForm<PostType>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = (data: PostType, event?: BaseSyntheticEvent) => {
    event?.preventDefault();
    console.log(data);

    const id = uuidv4();

    const post: PostsDTO = {
      id,
      authorId: "c614b743-8fbb-44cd-b82b-c65d0759cfee",
      summary: data.summary,
      title: data.title,
      urlImg: data.urlImg,
      views: 1,
    };

    mutation.mutate(post);
  };
  return (
    <form
      className="w-full max-w-3xl mx-auto p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-4 items-center mb-4">
        <label htmlFor="title" className="w-60">
          Título do Post
        </label>
        <Input
          id="title"
          {...register("title")}
          placeholder="Digite o título do post"
        />
      </div>

      <div className="flex gap-4 items-center mb-4">
        <label htmlFor="summary" className="w-60">
          Sumário da Publicação
        </label>
        <Input
          id="summary"
          {...register("summary")}
          placeholder="Digite o sumário do post"
        />
      </div>

      <div className="flex gap-4 items-center mb-4">
        <label htmlFor="urlImage" className="w-60">
          URL da Imagem
        </label>
        <Input
          id="urlImage"
          {...register("urlImg")}
          placeholder="Digite a URL da imagem do post"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Criar Postagem</Button>
      </div>
    </form>
  );
};
