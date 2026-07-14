"use client";

import { FeedHeader } from "@/features/feed/components/feed-header";
import { FeedLoadingSkeleton } from "@/features/feed/components/feed-loading-skeleton";
import { FeedErrorState } from "@/features/feed/components/feed-error-state";
import { FeedPostCard } from "@/features/feed/components/feed-post-card";
import { usePost } from "../hooks/use-post";

type PostDetailPageClientProps = {
  postId: string;
};

export function PostDetailPageClient({ postId }: PostDetailPageClientProps) {
  const postQuery = usePost(postId);

  return (
    <div className="_layout _layout_main_wrapper">
      <div className="_main_layout">
        <FeedHeader />
        <div className="container _custom_container">
          <div className="_layout_inner_wrap">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8 col-md-12 col-sm-12">
                {postQuery.isLoading ? <FeedLoadingSkeleton /> : null}
                {postQuery.isError ? <FeedErrorState /> : null}
                {postQuery.data ? <FeedPostCard post={postQuery.data} /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
