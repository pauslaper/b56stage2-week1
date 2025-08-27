import {
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    Text
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/use-store";
import {
    fetchFollowing,
    followUser,
    unfollowUser
} from "../../../store/follows-slice";
import { fetchSuggestedUsers } from "../../../store/suggestion-slice";
import "../styles/styles.css";

export function SuggestForYou({ userId }: { userId: number }) {
  const dispatch = useAppDispatch();
  const { users: suggestedUsers } = useAppSelector((state) => state.suggestion);
  const { following } = useAppSelector((state) => state.follows);

  useEffect(() => {
    dispatch(fetchFollowing());
    dispatch(fetchSuggestedUsers(userId));
  }, [dispatch, userId]);

  const isFollowing = (suggestedUserId: number) => {
    return following.some((follow) => follow.followed?.id === suggestedUserId);
  };

  const handleFollowToggle = (suggestedUserId: number) => {
    if (isFollowing(suggestedUserId)) {
      dispatch(unfollowUser(suggestedUserId));
    } else {
      dispatch(followUser(suggestedUserId));
    }
  };


  return (
    <Box
      mt={"8px"}
      backgroundColor={"brand.profile"}
      height={"275px"}
      width={"340px"}
      position={"relative"}
      padding={"8px 0px 12px 0px"}
      borderRadius={"md"}
    >
      <Heading
        fontSize={"13px"}
        padding={"2px 24px"}
        mb={"5px"}
        fontFamily={"Plus Jakarta Sans"}
        fontWeight={"700"}
      >
        Suggested for you
      </Heading>

      {Array.isArray(suggestedUsers) && suggestedUsers.length > 0 ? (
        suggestedUsers.map((user) => (
          user.id && ( 
            <Flex
              alignItems="center"
              mt={"12px"}
              padding="0 24px"
              justifyContent="space-between"
            >
              <Flex alignItems="center">
                <Avatar
                  size="sm"
                  src={user.image}
                  name={user.fullName}
                />
                <Box ml="12px">
                  <Text
                    fontSize={"12px"}
                    fontWeight={"600"}
                    fontFamily={"Plus Jakarta Sans"}
                  >
                    {user.fullName}
                  </Text>
                  <Text
                    fontSize={"12px"}
                    fontWeight={"400"}
                    fontFamily={"Plus Jakarta Sans"}
                    color={"#909090"}
                  >
                    @{user.username}
                  </Text>
                </Box>
              </Flex>

              <Button
                display={"flex"}
                justifyItems={"center"}
                size={"sm"}
                border={"1px solid #909090"}
                bg={"transparent"}
                color={isFollowing(user.id) ? "#909090" : "white"}
                fontFamily={"Plus Jakarta Sans"}
                fontWeight={"500"}
                _hover={{ bg: "#e0e0e0" }}
                borderRadius={"50px"}
                fontSize={"11px"}
                onClick={() => handleFollowToggle(user.id)}
              >
                {isFollowing(user.id) ? "Following" : "Follow"}
              </Button>
            </Flex>
          )
        ))
      ) : null}
    </Box>
  );
}

