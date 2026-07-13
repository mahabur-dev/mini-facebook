import { FeedHeader } from "@/features/feed/components/feed-header";
import { ProfileUpdateForm } from "@/features/users/components/profile-update-form";

export default function ProfilePage() {
  return (
    <div className="_layout _layout_main_wrapper">
      <div className="_main_layout">
        <FeedHeader />
        <div className="container _custom_container">
          <div className="_profile_update_wrap">
            <ProfileUpdateForm />
          </div>
        </div>
      </div>
    </div>
  );
}
