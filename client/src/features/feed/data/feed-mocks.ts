export type FeedPostMock = {
  id: string;
  author: string;
  avatar: string;
  timeLabel: string;
  visibility: "Public" | "Private";
  text: string;
  media?: string | null;
  mediaType?: string | null;
  likes: number;
  comments: number;
  shares: number;
  liked?: boolean;
  isOwner?: boolean;
};

export type FeedPageMock = {
  items: FeedPostMock[];
  nextCursor: string | null;
};
