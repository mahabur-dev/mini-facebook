export type MediaEntity = {
  id: string;
  ownerId: string;
  postId: string | null;
  imageUrl: string;
  storageKey: string;
  mimeType: string;
  fileSize: bigint;
  width: number | null;
  height: number | null;
  createdAt: Date;
  deletedAt: Date | null;
};
