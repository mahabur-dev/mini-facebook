"use client";

import { FormEvent, useEffect, useState } from "react";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useUpdateCurrentUser } from "../hooks/use-update-current-user";
import { useUpdateCurrentUserAvatar } from "../hooks/use-update-current-user-avatar";

export function ProfileUpdateForm() {
  const currentUser = useCurrentUser();
  const updateUser = useUpdateCurrentUser();
  const updateAvatar = useUpdateCurrentUserAvatar();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const user = currentUser.data?.user;
  const profileImage = user?.profileImageUrl ?? "/assets/images/profile.png";

  useEffect(() => {
    if (currentUser.data?.user) {
      setFirstName(currentUser.data.user.firstName);
      setLastName(currentUser.data.user.lastName);
    }
  }, [currentUser.data?.user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    try {
      await updateUser.mutateAsync({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });
      setMessage("Profile updated successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to update profile");
    }
  };

  const handleAvatarChange = async (file: File | undefined) => {
    if (!file) {
      return;
    }

    setMessage(null);
    try {
      await updateAvatar.mutateAsync(file);
      setMessage("Profile photo updated successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to update profile photo");
    }
  };

  return (
    <form className="_profile_update_card _b_radious6" onSubmit={handleSubmit}>
      <div className="_profile_update_header">
        <div className="_profile_update_photo">
          <img src={profileImage} alt="Profile" className="_profile_update_img" />
          <label className="_profile_update_photo_btn" htmlFor="profile-avatar-input" aria-label="Change profile photo">
            <input
              id="profile-avatar-input"
              className="_profile_update_file"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => void handleAvatarChange(event.target.files?.[0])}
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M9.2 4.5 8.1 6H5.5A3.5 3.5 0 0 0 2 9.5v7A3.5 3.5 0 0 0 5.5 20h13a3.5 3.5 0 0 0 3.5-3.5v-7A3.5 3.5 0 0 0 18.5 6h-2.6l-1.1-1.5A2.5 2.5 0 0 0 12.8 3h-1.6a2.5 2.5 0 0 0-2 1.5ZM12 17a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-1.7a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Z"
              />
            </svg>
          </label>
        </div>
        <div>
          <h4 className="_profile_update_title">Update profile</h4>
          <p className="_profile_update_email">{user?.email}</p>
          {updateAvatar.isPending ? <p className="_profile_update_uploading">Uploading photo...</p> : null}
        </div>
      </div>
      <div className="_profile_update_fields">
        <div className="_profile_update_field">
          <label className="_profile_update_label" htmlFor="profile-first-name">
            First Name
          </label>
          <input
            id="profile-first-name"
            className="form-control _profile_update_input"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
        </div>
        <div className="_profile_update_field">
          <label className="_profile_update_label" htmlFor="profile-last-name">
            Last Name
          </label>
          <input
            id="profile-last-name"
            className="form-control _profile_update_input"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
          />
        </div>
      </div>
      {message ? <p className="_profile_update_message">{message}</p> : null}
      <button className="_profile_update_btn" type="submit" disabled={updateUser.isPending}>
        {updateUser.isPending ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
