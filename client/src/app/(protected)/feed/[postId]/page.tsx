import { PostDetailPageClient } from "@/features/posts/components/post-detail-page-client";

type PostDetailPageProps = {
  params: Promise<{ postId: string }>;
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { postId } = await params;
  return <PostDetailPageClient postId={postId} />;
}
