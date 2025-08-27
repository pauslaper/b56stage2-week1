import { Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { ThreadEntity } from "../../../../entities/thread";
import { UserEntity } from "../../../../entities/user";
import { useAppDispatch, useAppSelector } from "../../../../hooks/use-store";
import {
  fetchFolloweds,
  followedUser,
  unfollowUser,
} from "../../../../store/following-slice";
import {
  fetchFollowers,
  fetchFollowing
} from "../../../../store/follows-slice";
import {
  fetchSelectedUser,
  fetchThreadsProfile,
} from "../../../../store/profile-user-slice";
import { toggleLikeReply } from "../../../../store/replyLike-slice";
import { RootState } from "../../../../store/store";
import { toggleLikeThread } from "../../../../store/threadLike-slice";
import { useHome } from "../../hooks/useHome";
import { useReply } from "../../hooks/useReply";
import { ProfileView } from "./profileView";
import { Replies } from "./replies";
import { ReplyForm } from "./replyForm";
import { ThreadForm } from "./thread";
import { ThreadDetail } from "./threadDetail";
import { ThreadList } from "./threadList";

export function WhatHappen() {
  const dispatch = useAppDispatch();

  const [currentView, setCurrentView] = useState<
    "whatHappen" | "postCard" | "profile"
  >("whatHappen");
  const [show, setShow] = useState(false);
  const [threadId, setThreadId] = useState<number | null>(null);
  const { following } = useSelector((state: RootState) => state.follows);
  const { register, handleSubmit, isSubmitting, onSubmit, data } = useHome();
  const validThreadId = threadId ?? 0;
  const {
    register: reply,
    handleSubmit: replySubmit,
    isSubmitting: replyIsSubmitting,
    onSubmit: replyOnSubmit,
    data: replyData,
  } = useReply(validThreadId);
  const profiles = useAppSelector((state) => state.profile.threads);
  const [selectedThread, setSelectedThread] = useState<ThreadEntity | null>(
    null
  );
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchFollowing());
  }, [dispatch]);

  const isFollowing = (userId: number) => {
    return following.some(
      (user) => user.followed && user.followed.id === userId
    );
  };

   const handleFollowClick = (userId: number, isFollowing: boolean) => {
     if (isFollowing) {
       dispatch(unfollowUser(userId));
     } else {
       dispatch(followedUser(userId));
     }
   };

  const goToPostCard = (thread: ThreadEntity) => {
    setSelectedThread(thread);
    setCurrentView("postCard");
    handleThreadClick(thread.id);
  };

  const selectedUser = useSelector(
    (state: RootState) => state.profile.selectedUser
  );

  const goToProfile = (
    userId: number,
    thread: ThreadEntity,
    user: UserEntity
  ) => {
    dispatch(fetchThreadsProfile(userId));
    console.log(user);
    dispatch(fetchSelectedUser(userId));

    setCurrentView("profile");

    handleThreadClick(thread.id);
  };

  const goToWhatHappen = () => {
    setCurrentView("whatHappen");
  };

  const handleThreadClick = (id: number) => {
    setThreadId(id);
  };

  const { replyLikes } = useAppSelector((state) => state.reply);

  const handleLikeReply = (replyId: number) => {
    dispatch(toggleLikeReply(replyId));
  };

  useEffect(() => {
    dispatch(fetchFollowers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFolloweds());
  }, [dispatch]);

  const { likes } = useAppSelector((state) => state.like);

  const handleLike = (threadId: number) => {
    dispatch(toggleLikeThread(threadId));
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setShow(true);
    } else {
      setImage(null);
      setShow(false);
    }
  };

  return (
    <>
      {currentView === "whatHappen" && (
        <>
          <Text
            color={"white"}
            padding={"20px 20px 8px 20px"}
            fontSize={"xl"}
            fontFamily={"Plus Jakarta Sans"}
            fontWeight={"bold"}
          >
            Home
          </Text>
          <ThreadForm
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            image={image}
            show={show}
            setShow={setShow}
            handleChangeImage={handleChangeImage}
          />

          <ThreadList
            data={data ?? []}
            likes={likes}
            handleThreadClick={handleThreadClick}
            goToPostCard={goToPostCard}
            goToProfile={goToProfile}
            handleLike={handleLike}
          />
        </>
      )}

      {currentView === "profile" && (
        <ProfileView
          selectedUser={selectedUser}
          likes={replyLikes}
          profiles={profiles}
          isFollowing={isFollowing}
          handleFollow={handleFollowClick}
          goToWhatHappen={goToWhatHappen}
          goToProfile={goToProfile}
          handleThreadClick={handleThreadClick}
          handleLike={handleLike}
        />
      )}

      {/* Replies */}
      {currentView === "postCard" && (
        <>
          <Flex>
            <Button
              onClick={goToWhatHappen}
              leftIcon={<IoIosArrowRoundBack size="30px" />}
              bg="transparent"
              _active={{ color: "white", bg: "none" }}
              fontWeight="500"
              display="flex"
              justifyContent="start"
              padding="10px 10px"
              color="white"
              mt="auto"
              fontFamily="Plus Jakarta Sans"
              _hover={{ textDecoration: "none", bg: "none" }}
            />
            <Text
              color="white"
              mt="3px"
              fontSize="xl"
              fontFamily="Plus Jakarta Sans"
              fontWeight="bold"
            >
              Status
            </Text>
          </Flex>

          <ThreadDetail
            selectedThread={
              selectedThread ?? {
                id: 0,
                content: "",
                userId: 0,
                user: {
                  id: 0,
                  fullName: "",
                  email: "",
                  image: "",
                  backgroundImage: "",
                  username: "",
                  bio: "",
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  socialConnection: null,
                  role: "",
                  followeds: [],
                  followers: [],
                },
                createdAt: new Date(),
                updatedAt: new Date(),
              }
            }
            likes={replyLikes}
            handleLike={handleLikeReply}
          />
          <ReplyForm
            reply={reply}
            replySubmit={replySubmit}
            replyOnSubmit={replyOnSubmit}
            replyIsSubmitting={replyIsSubmitting}
            handleChangeImage={handleChangeImage}
            show={show}
            setShow={setShow}
            image={image}
          />
          <Replies
            replyData={replyData ?? []}
            replyLikes={replyLikes}
            handleLikeReply={handleLikeReply}
          />
        </>
      )}
    </>
  );
}
