export type PublicUserView = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl: string | null;
  profileImageStorageKey: string | null;
  status: string;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export function presentUser(user: PublicUserView) {
  return user;
}
