import type { FeedPageMock, FeedPostMock } from "@/features/feed/data/feed-mocks";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type Comment = {
  id: string;
  postId: string;
  author: string;
  content: string;
  parentCommentId?: string | null;
};

type ReactionUser = {
  id: string;
  name: string;
};

const users: User[] = [
  { id: "user-1", firstName: "Karim", lastName: "Saif", email: "karim@example.com" },
  { id: "user-2", firstName: "Ryan", lastName: "Roslansky", email: "ryan@example.com" },
  { id: "user-3", firstName: "Dylan", lastName: "Field", email: "dylan@example.com" },
];

const feedPosts: FeedPostMock[] = [
  {
    id: "post-1",
    author: "Karim Saif",
    avatar: "/assets/images/post_img.png",
    timeLabel: "5 minute ago",
    visibility: "Public",
    text: "This is a sample feed card rendered through React components. It keeps the same visual class names and spacing while moving the structure out of one huge HTML block.",
    media: "/assets/images/feed_event1.png",
    likes: 19,
    comments: 8,
    shares: 2,
  },
  {
    id: "post-2",
    author: "Ryan Roslansky",
    avatar: "/assets/images/profile-1.png",
    timeLabel: "18 minute ago",
    visibility: "Private",
    text: "The feed now loads through a query hook backed by mock pagination, so the UI can behave like a production feed without a backend.",
    media: "/assets/images/timeline_img.png",
    likes: 42,
    comments: 12,
    shares: 4,
  },
];

const comments: Comment[] = [
  { id: "comment-1", postId: "post-1", author: "Ryan Roslansky", content: "Looks great." },
  { id: "comment-2", postId: "post-1", author: "Dylan Field", content: "Nice structure." },
];

const reactions: ReactionUser[] = [
  { id: "reaction-1", name: "Ryan Roslansky" },
  { id: "reaction-2", name: "Dylan Field" },
  { id: "reaction-3", name: "Steve Jobs" },
];

const feedPages: FeedPageMock[] = [
  {
    items: feedPosts.slice(0, 1),
    nextCursor: "page-2",
  },
  {
    items: feedPosts.slice(1),
    nextCursor: null,
  },
];

function rebuildFeedPages() {
  feedPages[0] = {
    items: feedPosts.slice(0, 1),
    nextCursor: feedPosts.length > 1 ? "page-2" : null,
  };
  feedPages[1] = {
    items: feedPosts.slice(1),
    nextCursor: null,
  };
}

function findFeedPost(id: string) {
  return feedPosts.find((post) => post.id === id);
}

export const mockDb = {
  users,
  feedPosts,
  comments,
  reactions,
  feedPages,
  currentUser: users[0] as User,
  addPost(post: FeedPostMock) {
    feedPosts.unshift(post);
    rebuildFeedPages();
    return post;
  },
  addComment(comment: Comment) {
    comments.unshift(comment);
    return comment;
  },
  addReply(reply: Comment) {
    comments.unshift(reply);
    return reply;
  },
  updatePostLikes(postId: string, delta: number) {
    const post = findFeedPost(postId);
    if (post) {
      post.likes = Math.max(0, post.likes + delta);
    }
    rebuildFeedPages();
    return post;
  },
  nextCommentId() {
    return `comment-${comments.length + 1}`;
  },
  nextReplyId() {
    return `reply-${Date.now()}`;
  },
  nextPostId() {
    return `post-${feedPosts.length + 1}`;
  },
};
