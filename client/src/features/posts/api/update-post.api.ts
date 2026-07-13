import { apiClient } from "@/lib/api/api-client";

export type UpdatePostInput = {
  text?: string;
  visibility?: "Public" | "Private";
};

export async function updatePost(id: string, input: UpdatePostInput) {
  const result = await apiClient<{ post: unknown }>(`/posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      content: input.text,
      visibility: input.visibility ? input.visibility.toUpperCase() : undefined,
    }),
  });

  return result.post;
}
