export type Reaction = {
  id: string;
  name: string;
  email?: string;
  profileImageUrl?: string | null;
};

export type ReactionTargetType = "post" | "comment" | "reply";
