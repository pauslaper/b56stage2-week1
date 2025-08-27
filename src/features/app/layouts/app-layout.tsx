import { useState } from "react";
import { useLocation } from "react-router-dom";
import { CreatePost } from "../components/create-post";
import { EditProfile } from "../components/edit-profile";
import { LeftBar } from "../components/left-bar";
import { RightBar } from "../components/right-bar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const location = useLocation();
  const isProfileVisible = location.pathname === "/profile";

  const handleOpenCreatePost = () => setShowCreatePost(true);
  const handleCloseCreatePost = () => setShowCreatePost(false);

  const handleOpenEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleCloseEditProfile = () => setShowEditProfile(false);

  return (
    <>
      <LeftBar onOpenCreatePost={handleOpenCreatePost} />
      {children}
      <RightBar
        isProfileVisible={isProfileVisible}
        onEditProfileClick={handleOpenEditProfile}
      />
      {showCreatePost && <CreatePost onClose={handleCloseCreatePost} />}
      {showEditProfile && <EditProfile onClose={handleCloseEditProfile} />}
    </>
  );
}
