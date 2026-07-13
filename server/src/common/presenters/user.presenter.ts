export type PublicUserView = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export function presentUser(user: PublicUserView) {
  return user;
}
