import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../hooks/use-store";
import { followedUser } from "../../../store/following-slice";
import {
  fetchFollowers,
  fetchFollowing,
  followUser,
  unfollowUser,
} from "../../../store/follows-slice";
import { RootState } from "../../../store/store";

export function Follows() {
  const [activeTab, setActiveTab] = useState<"followers" | "following">(
    "followers"
  );

  return (
    <Flex
      direction="column"
      width={`calc(100vw - 736px)`}
      height="auto"
      bg="brand.bg"
      color="white"
      ml="325px"
      mr="430px"
    >
      <Text
        mt={"5px"}
        color={"white"}
        padding={"20px 20px 8px 20px"}
        fontSize={"xl"}
        fontFamily={"Plus Jakarta Sans"}
        fontWeight={"bold"}
      >
        Follows
      </Text>
      <FollowsContent activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "followers" ? <Followers /> : <Following />}
    </Flex>
  );
}

export function FollowsContent({
  setActiveTab,
}: {
  activeTab: "followers" | "following";
  setActiveTab: React.Dispatch<React.SetStateAction<"followers" | "following">>;
}) {
  return (
    <Flex
      direction="row"
      alignItems="center"
      justifyContent="center"
      mt="5px"
      padding="0px 5px"
      width="100%"
    >
      <Box
        display={"flex"}
        textAlign={"center"}
        _hover={{ bg: "#303030" }}
        padding={"0px 10px"}
        flex={"1"}
      >
        <Button
          onClick={() => setActiveTab("followers")}
          bg={"none"}
          color={"white"}
          _focus={{ bg: "none", borderBottom: "3px solid #04A51E" }}
          _hover={{ bg: "none" }}
          flex={"1"}
        >
          <Text fontSize={"sm"}>Followers</Text>
        </Button>
      </Box>
      <Box
        display={"flex"}
        textAlign={"center"}
        _hover={{ bg: "#303030" }}
        padding={"0px 10px"}
        flex={"1"}
      >
        <Button
          onClick={() => setActiveTab("following")}
          bg={"none"}
          color={"white"}
          _focus={{ bg: "none", borderBottom: "3px solid #04A51E" }}
          _hover={{ bg: "none" }}
          flex="1"
        >
          <Text fontSize={"sm"}>Following</Text>
        </Button>
      </Box>
    </Flex>
  );
}

export function Followers() {
  const dispatch = useAppDispatch();
  const { followers } = useAppSelector((state) => state.follows);

  useEffect(() => {
    dispatch(fetchFollowers());
  }, [dispatch]);

  const handleFollowToggle = (followerId: number, isFollowing: boolean) => {
    if (isFollowing) {
      dispatch(unfollowUser(followerId));
    } else {
      dispatch(followUser(followerId));
    }
  };

  return (
    <Flex padding="12px 16px" width="100%" maxWidth="100%" direction="column">
      {followers.length > 0
        ? followers.map((follow) => {
            const follower = follow.follower;
            const isFollowingUser = follow.isFollowing;
  
            return (
              <Flex key={follower.id} mt="10px" ml="5px" width="100%">
                <Avatar
                  size="sm"
                  src={follower.image}
                  name={follower.fullName}
                />
                <Flex ml="10px" direction="column">
                  <Text
                    fontWeight="700"
                    fontFamily="Plus Jakarta Sans"
                    fontSize="12px"
                  >
                    {follower.fullName}
                  </Text>
                  <Text
                    mb="5px"
                    fontFamily="Plus Jakarta Sans"
                    fontSize="12px"
                    color="gray.500"
                  >
                    @{follower.username }
                  </Text>
                  <Text
                    mb="5px"
                    fontFamily="Plus Jakarta Sans"
                    fontSize="11px"
                    color="white"
                  >
                    {follower.bio}
                  </Text>
                </Flex>
                <Button
                  _hover={{ bg: "none" }}
                  marginLeft="auto"
                  bg="none"
                  mb="40px"
                  border="1px solid #909090"
                  color={isFollowingUser ? "#909090" : "white"}
                  fontSize="12px"
                  borderRadius="full"
                  size="sm"
                  onClick={() => handleFollowToggle(follower.id, isFollowingUser)}
                >
                  {isFollowingUser ? "Following" : "Follow"}
                </Button>
              </Flex>
            );
          })
        : null}
    </Flex>
  );
  
}

export function Following() {
  const dispatch = useAppDispatch();
  const { following } = useSelector((state: RootState) => state.following);

  useEffect(() => {
    dispatch(fetchFollowing());
  }, [dispatch]);

  const handleFollowClick = (userId: number, isFollowing: boolean) => {
    if (isFollowing) {
      dispatch(unfollowUser(userId));
    } else {
      dispatch(followedUser(userId));
    }
  };

  return (
    <Flex padding="12px 16px" width="100%" maxWidth="100%" direction={"column"}>
      {following.map((following) => {
        const followingUser = following.followed;

        return (
          <Flex mt={"10px"} ml="5px" width="100%" key={followingUser.id}>
            <Avatar
              size="sm"
              src={followingUser.image}
              name={followingUser.fullName}
            />
            <Flex ml={"10px"} direction={"column"}>
              <Text
                fontWeight="700"
                fontFamily={"Plus Jakarta Sans"}
                fontSize="12px"
              >
                {followingUser.fullName}
              </Text>
              <Text
                mb={"5px"}
                fontFamily={"Plus Jakarta Sans"}
                fontSize="12px"
                color="gray.500"
              >
                @{followingUser.username}
              </Text>
              <Text
                mb={"5px"}
                fontFamily={"Plus Jakarta Sans"}
                fontSize="11px"
                color="White"
              >
                {followingUser.bio}
              </Text>
            </Flex>
            <Button
              _hover={{ bg: "none" }}
              marginLeft={"auto"}
              bg={"none"}
              mb={"40px"}
              border="1px solid #909090"
              color="#909090"
              fontSize={"12px"}
              borderRadius={"full"}
              size={"sm"}
              onClick={() =>
                handleFollowClick(
                  followingUser.id,
                  following.isFollowing || false
                )
              }
            >
              {following.isFollowing ? "Following" : "Follow"}
            </Button>
          </Flex>
        );
      })}
    </Flex>
  );
}
