import { Avatar, Box, Button, Flex, Icon, Img, Text } from "@chakra-ui/react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { UserEntity } from "../../../../entities/user";
import { ThreadEntity } from "../../../../entities/thread";

interface ProfileViewProps {
  selectedUser: UserEntity | null;
  profiles: ThreadEntity[];
  likes: Record<number, { isLiked: boolean; likesCount: number }>;
  isFollowing: (userId: number) => boolean;
  handleFollow: (userId: number, isFollowing: boolean) => void;
  handleLike: (threadId: number) => void;
  goToWhatHappen: () => void;
  goToPostCard?: (thread: ThreadEntity) => void;
  goToProfile?: (
    userId: number,
    thread: ThreadEntity,
    user: UserEntity
  ) => void;
  handleThreadClick?: (threadId: number) => void;
}

export function ProfileView({
  selectedUser,
  profiles,
  likes,
  isFollowing,
  handleFollow,
  handleLike,
  goToWhatHappen,
}: ProfileViewProps) {
  if (!selectedUser) return null;

  return (
    <>
      <Box
        height={"300px"}
        width={"100%"}
        position={"relative"}
        borderRadius={"md"}
      >
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Flex>
            <Button
              leftIcon={<IoIosArrowRoundBack size="30px" />}
              bg="transparent"
              _active={{ color: "white", bg: "none" }}
              fontWeight="500"
              justifyContent="start"
              padding="0px 10px"
              color="white"
              mt="10px"
              fontFamily="Plus Jakarta Sans"
              _hover={{ textDecoration: "none", bg: "none" }}
              onClick={goToWhatHappen}
            />
            <Text
              padding={"10px 0px"}
              fontFamily={"Plus Jakarta Sans"}
              fontWeight={"550"}
              fontSize={"23px"}
              width={"100%"}
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {selectedUser.fullName}
            </Text>
          </Flex>

          <Img
            src={
              selectedUser.backgroundImage ||
              "https://res.cloudinary.com/db2rr1kej/image/upload/v1728136949/uploads/dxudu0wusd9ww8r3chjw.png"
            }
            width="100%"
            height={"100px"}
            padding={"0px 15px"}
            borderRadius="3xl"
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
            src={selectedUser.image}
            name={selectedUser.fullName}
          />

          <Button
            left={"83%"}
            top={"10px"}
            size={"sm"}
            border={"1px solid white"}
            bg={"transparent"}
            color={isFollowing(selectedUser.id) ? "#909090" : "white"}
            fontFamily={"Plus Jakarta Sans"}
            fontWeight={"500"}
            _hover={{ color: "none" }}
            _active={{ color: "none" }}
            borderRadius={"50px"}
            fontSize={"10px"}
            onClick={() => {
              handleFollow(selectedUser.id, isFollowing(selectedUser.id));
            }}
          >
            {isFollowing(selectedUser.id) ? "Following" : "Follow"}
          </Button>

          {/* User Info */}
          <Box margin={"20px 10px"} width="100%">
            <Text
              fontFamily={"Plus Jakarta Sans"}
              fontSize={"18px"}
              fontWeight={"700"}
              width="100%"
              wordBreak="break-word"
            >
              {selectedUser.fullName}
            </Text>
            <Text
              fontFamily={"Plus Jakarta Sans"}
              fontSize={"10px"}
              color={"#909090"}
            >
              @{selectedUser.username}
            </Text>
            <Text
              fontSize={"13px"}
              fontFamily={"Plus Jakarta Sans"}
              fontWeight={"400"}
              width="100%"
              wordBreak="break-word"
            >
              {selectedUser.bio}
            </Text>
            <Flex align={"center"} padding={"4px 0px"}>
              <Text
                fontWeight="700"
                fontSize={"13px"}
                fontFamily={"Plus Jakarta Sans"}
              >
                {selectedUser.followers?.length || 0}
              </Text>
              <Text
                ml="4px"
                color={"#909090"}
                fontSize={"13px"}
                fontFamily={"Plus Jakarta Sans"}
              >
                Followers
              </Text>
              <Text
                ml="20px"
                fontWeight="700"
                fontSize={"13px"}
                fontFamily={"Plus Jakarta Sans"}
              >
                {selectedUser.followeds?.length || 0}
              </Text>
              <Text
                ml="4px"
                color={"#909090"}
                fontSize={"13px"}
                fontFamily={"Plus Jakarta Sans"}
              >
                Following
              </Text>
            </Flex>
          </Box>
        </Box>
      </Box>

      {/* Thread List */}
      <Flex direction="column" width="calc(100% - 50px)" ml={"5px"}>
        {profiles?.map((thread) => {
          const likeData = likes[thread.id] || {
            isLiked: false,
            likesCount: 0,
          };

          return (
            <Flex
              key={thread.id}
              direction="column"
              mt="10px"
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
                      @{thread.user.username}
                      <Text as="span" color="gray.500" ml="1px" mr="1px">
                        •
                      </Text>
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
                    />
                  )}

                  <Flex mb="10px" mt="10px" color="gray.500" fontSize="sm">
                    <Flex
                      fontFamily="Plus Jakarta Sans"
                      fontWeight="400"
                      fontSize="12px"
                      alignItems="center"
                      mr="20px"
                      cursor={"pointer"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(thread.id);
                      }}
                    >
                      <Icon
                        as={likeData.isLiked ? FcLike : FaRegHeart}
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
          );
        })}
      </Flex>
    </>
  );
}
