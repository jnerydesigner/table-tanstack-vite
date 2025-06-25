import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getPosts } from "@/api/posts";
import { FormCreatePost } from "@/components/form-create-post";

export default function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["data-posts"],
    queryFn: async () => await getPosts(),
  });

  if (isLoading) {
    return <h1>Pesquisando ...</h1>;
  }

  return (
    <div className="container mx-auto py-14 mt-2">
      <FormCreatePost />
      <DataTable columns={columns} data={data ? data : []} />
    </div>
  );
}
