import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Img,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../hooks/use-store";
import { fetchFolloweds } from "../../../store/following-slice";
import { fetchThreadsByUserId } from "../../../store/profile-slice";
import { RootState } from "../../../store/store";
import { EditProfile } from "./edit-profile";
import { FcLike } from "react-icons/fc";
import { toggleLikeThread } from "../../../store/threadLike-slice";

export function Profile() {
  const [isEditProfileVisible, setEditProfileVisible] = useState(false);

  const handleEditProfileClick = () => {
    setEditProfileVisible(true);
  };

  const handleCloseEditProfile = () => {
    setEditProfileVisible(false);
  };

  return (
    <Flex
      direction="column"
      width={`calc(100vw - 736px)`}
      height="auto"
      bg="brand.bg"
      color="white"
      ml="322px"
    >
      <ProfileContent onEditProfileClick={handleEditProfileClick} />
      <PostCard />
      {isEditProfileVisible && <EditProfile onClose={handleCloseEditProfile} />}
    </Flex>
  );
}

export function ProfileContent({
  onEditProfileClick,
}: {
  onEditProfileClick: () => void;
}) {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth);
  const { following } = useSelector((state: RootState) => state.following);
  const { followers } = useSelector((state: RootState) => state.follows);

  useEffect(() => {
    dispatch(fetchFolloweds());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFolloweds());
  }, [dispatch]);

  return (
    <Box
      ml="3px"
      height={"300px"}
      width="100%"
      maxW="100%"
      position={"relative"}
      borderRadius={"md"}
    >
      <Box
        display="flex"
        flexDirection="column"
        width={"calc(100vw - 736px)"}
        alignItems="flex-start"
      >
        <Text
          padding={"10px 20px"}
          fontFamily={"Plus Jakarta Sans"}
          fontWeight={"550"}
          fontSize={"23px"}
        >
          {user.fullName}
        </Text>
        <Image
          src={
            user.backgroundImage ||
            "https://res.cloudinary.com/db2rr1kej/image/upload/v1728136949/uploads/dxudu0wusd9ww8r3chjw.png"
          }
          width="100%"
          height="100px"
          borderRadius="xl"
        />
        <Avatar
          size="lg"
          position={"absolute"}
          top={"55%"}
          left={"7%"}
          transform={"translate(-50%, -50%)"}
          zIndex={"1"}
          border={"2px solid black"}
          margin={"0px 30px"}
          src={user.image}
          name={user.fullName}
        />
        <Button
          left={"83%"}
          top={"10px"}
          size={"sm"}
          border={"1px solid white"}
          bg={"transparent"}
          color={"white"}
          fontFamily={"Plus Jakarta Sans"}
          fontWeight={"500"}
          _hover={{ color: "none" }}
          _active={{ color: "none" }}
          borderRadius={"50px"}
          fontSize={"10px"}
          onClick={onEditProfileClick}
        >
          Edit Profile
        </Button>
        <Box margin={"20px 10px"}>
          <Text
            fontFamily={"Plus Jakarta Sans"}
            fontSize={"18px"}
            fontWeight={"700"}
          >
            {user.fullName}
          </Text>
          <Text
            fontFamily={"Plus Jakarta Sans"}
            fontSize={"10px"}
            color={"#909090"}
          >
            @{user.username}
          </Text>
          <Text
            fontSize={"13px"}
            fontFamily={"Plus Jakarta Sans"}
            fontWeight={"400"}
          >
            {user.bio}
          </Text>
          <Flex align={"center"} padding={"4px 0px"}>
            <Text
              fontWeight="700"
              fontSize={"13px"}
              fontFamily={"Plus Jakarta Sans"}
            >
              {following.length}
            </Text>
            <Text
              ml="4px"
              color={"#909090"}
              fontSize={"13px"}
              fontFamily={"Plus Jakarta Sans"}
            >
              Following
            </Text>
            <Text
              ml="20px"
              fontWeight="700"
              fontSize={"13px"}
              fontFamily={"Plus Jakarta Sans"}
            >
              {followers.length}
            </Text>
            <Text
              ml="4px"
              color={"#909090"}
              fontSize={"13px"}
              fontFamily={"Plus Jakarta Sans"}
            >
              Followers
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export function PostCard() {
  const dispatch = useAppDispatch();

  const threads = useAppSelector((state) => state.thread.threads);
  const userId = useAppSelector((state) => state.auth.id);
  const { likes } = useAppSelector((state) => state.like);

  const handleLike = (threadId: number) => {
    dispatch(toggleLikeThread(threadId));
  };

  useEffect(() => {
    if (userId) {
      console.log("Fetching threads for userId:", userId);
      dispatch(fetchThreadsByUserId(userId));
    } else {
      console.error("userId is undefined");
    }
  }, [dispatch, userId]);

  return (
    <>
      {Array.isArray(threads) && threads.length > 0
        ? threads.map((thread) => {
            const likeData = likes[thread.id] || {
              isLiked: false,
              likesCount: 0,
            };
            return (
              <Flex width="calc(100% - 50px)" key={thread.id}>
                <Flex
                  direction="column"
                  mt="10px"
                  ml="10px"
                  mb="0px"
                  width="100%"
                >
                  <Flex mt="10px" borderBottom="1px solid #545454">
                    <Avatar
                      size="sm"
                      src={thread.user.image}
                      name={thread.user.fullName}
                    />
                    <Box ml="10px" width="100%">
                      <Flex>
                        <Text
                          fontWeight="700"
                          fontFamily="Plus Jakarta Sans"
                          fontSize="12px"
                        >
                          {thread.user.fullName}
                        </Text>
                        <Text
                          ml="5px"
                          mb="5px"
                          fontFamily="Plus Jakarta Sans"
                          fontSize="12px"
                          color="gray.500"
                        >
                          {thread.user.username}{" "}
                          <Text as="span" color="gray.500" ml="1px" mr="1px">
                            •
                          </Text>{" "}
                          {new Date(thread.createdAt)
                            .toTimeString()
                            .toString()
                            .slice(0, 5)}
                        </Text>
                      </Flex>
                      <Text
                        fontSize="12px"
                        fontFamily="Plus Jakarta Sans"
                        fontWeight="400"
                        color="white"
                      >
                        {thread.content}
                      </Text>
                      {thread.image && thread.image !== "" && (
                        <Img
                          mt="10px"
                          src={thread.image}
                          width={"400px"}
                          height={"300px"}
                          objectFit={"contain"}
                        />
                      )}
                      <Flex mb="10px" mt="10px" color="gray.500" fontSize="sm">
                        <Flex
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(thread.id);
                          }}
                          cursor="pointer"
                          fontFamily="Plus Jakarta Sans"
                          fontWeight="400"
                          fontSize="12px"
                          alignItems="center"
                          mr="20px"
                        >
                          <Icon
                            as={likeData.isLiked ? FcLike : FaRegHeart}
                            size={"15px"}
                            mr="5px"
                          />
                          {thread.likes?.length}
                        </Flex>
                        <Flex
                          fontFamily="Plus Jakarta Sans"
                          fontWeight="400"
                          fontSize="12px"
                          alignItems="center"
                          mr="20px"
                        >
                          <Icon as={BiMessageSquareDetail} mr="5px" />
                          {thread.replies?.length} Replies
                        </Flex>
                      </Flex>
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
            );
          })
        : null}
    </>
  );
}
