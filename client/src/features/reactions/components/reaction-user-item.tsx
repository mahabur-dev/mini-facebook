import type { Reaction } from "../types/reaction.types";

type ReactionUserItemProps = {
  user: Reaction;
};

function getFallbackAvatar(userId: string) {
  const avatars = ["/assets/images/profile.png", "/assets/images/profile-1.png", "/assets/images/txt_img.png", "/assets/images/people1.png"];
  const index = Math.abs(userId.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)) % avatars.length;
  return avatars[index];
}

export function ReactionUserItem({ user }: ReactionUserItemProps) {
  return (
    <div className="_reaction_user_item">
      <img src={user.profileImageUrl ?? getFallbackAvatar(user.id)} alt={user.name} className="_reaction_user_img" />
      <div>
        <h4 className="_reaction_user_name">{user.name}</h4>
      </div>
    </div>
  );
}
