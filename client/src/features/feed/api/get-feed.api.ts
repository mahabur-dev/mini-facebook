import { apiClient } from "@/lib/api/api-client";
import type { FeedPageMock, FeedPostMock } from "../data/feed-mocks";

type BackendFeedUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

type BackendFeedPost = {
  id: string;
  authorId: string;
  content: string | null;
  visibility: "PUBLIC" | "PRIVATE";
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  author: BackendFeedUser;
  media: {
    id: string;
    ownerId: string;
    postId: string | null;
    imageUrl: string;
    storageKey: string;
    mimeType: string;
    fileSize: string;
    width: number | null;
    height: number | null;
    createdAt: string;
    deletedAt: string | null;
  } | null;
  statistics: {
    postId: string;
    likeCount: number;
    commentCount: number;
    replyCount: number;
    updatedAt: string;
  } | null;
  isLikedByCurrentUser: boolean;
  isOwner: boolean;
};

type BackendFeedResponse = {
  posts: BackendFeedPost[];
  nextCursor: string | null;
};

function getAvatarForAuthor(authorId: string) {
  const avatars = [
    "/assets/images/profile.png",
    "/assets/images/profile-1.png",
    "/assets/images/post_img.png",
    "/assets/images/txt_img.png",
    "/assets/images/people1.png",
    "/assets/images/people2.png",
  ];

  const index = Math.abs(authorId.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)) % avatars.length;
  return avatars[index];
}

function formatRelativeTime(value: string) {
  const now = Date.now();
  const date = new Date(value).getTime();
  const diffMinutes = Math.max(1, Math.round((now - date) / 60000));

  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  }

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  }

  const diffDays = Math.round(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
}

function mapFeedPost(post: BackendFeedPost): FeedPostMock {
  const authorName = `${post.author.firstName} ${post.author.lastName}`.trim();

  return {
    id: post.id,
    author: authorName,
    avatar: getAvatarForAuthor(post.authorId),
    timeLabel: formatRelativeTime(post.createdAt),
    visibility: post.visibility === "PRIVATE" ? "Private" : "Public",
    text: post.content ?? "",
    media: post.media?.imageUrl ?? "/assets/images/feed_event1.png",
    likes: post.statistics?.likeCount ?? 0,
    comments: (post.statistics?.commentCount ?? 0) + (post.statistics?.replyCount ?? 0),
    shares: 0,
    liked: post.isLikedByCurrentUser,
  };
}

export async function getFeed(cursor?: string | null) {
  const params = new URLSearchParams();
  if (cursor) {
    params.set("cursor", cursor);
  }
  params.set("limit", "10");

  const response = await apiClient<BackendFeedResponse>(`/feed?${params.toString()}`);
  return {
    items: response.posts.map(mapFeedPost),
    nextCursor: response.nextCursor,
  } satisfies FeedPageMock;
}
