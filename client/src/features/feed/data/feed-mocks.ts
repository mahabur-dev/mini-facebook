export type FeedPostMock = {
  id: string;
  author: string;
  avatar: string;
  timeLabel: string;
  visibility: "Public" | "Private";
  text: string;
  media: string;
  likes: number;
  comments: number;
  shares: number;
  liked?: boolean;
};

export type FeedPageMock = {
  items: FeedPostMock[];
  nextCursor: string | null;
};
