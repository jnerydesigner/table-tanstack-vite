import type { PostsDTO } from "@/types/posts-dto.type";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<PostsDTO>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Titulo",
  },
  {
    accessorKey: "views",
    header: "Views",
  },
];
