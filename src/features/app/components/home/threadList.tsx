import { Avatar, Box, Flex, Icon, Img, Text } from "@chakra-ui/react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { ThreadEntity } from "../../../../entities/thread";
import { UserEntity } from "../../../../entities/user";

interface ThreadListProps {
  data: ThreadEntity[];
  likes: Record<string, { isLiked: boolean; likesCount: number }>;
  handleThreadClick: (threadId: number) => void;
  goToPostCard: (thread: ThreadEntity) => void;
  goToProfile: (userId: number, thread: ThreadEntity, user: UserEntity) => void;
  handleLike: (threadId: number) => void;
}

export function ThreadList({
  data,
  likes,
  handleThreadClick,
  goToPostCard,
  goToProfile,
  handleLike,
}: ThreadListProps) {
  return (
    <>
      {Array.isArray(data) &&
        data.map((thread) => {
          const likeData = likes[thread.id] || {
            isLiked: false,
            likesCount: thread.likes || 0,
          };

          return (
            <Flex
              key={thread.id}
              border="1px solid #545454"
              padding="12px 16px"
              height="auto"
              width="100%"
              cursor="pointer"
            >
              <Box>
                <Avatar
                  size="sm"
                  src={thread.user.image}
                  name={thread.user.fullName}
                  onClick={() =>
                    goToProfile(thread.user.id, thread, thread.user)
                  }
                />
              </Box>
              <Box
                ml="10px"
                width="100%"
                onClick={() => {
                  goToPostCard(thread);
                  handleThreadClick(thread.id);
                }}
              >
                <Flex>
                  <Text
                    fontWeight="700"
                    fontFamily="Plus Jakarta Sans"
                    fontSize="12px"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
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
                    {new Date(thread.createdAt).toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </Text>
                </Flex>
                <Text
                  fontSize="12px"
                  fontFamily="Plus Jakarta Sans"
                  fontWeight="400"
                  color="white"
                  width="100%"
                  wordBreak="break-word"
                >
                  {thread.content}
                </Text>
                {thread.image && thread.image !== "" && (
                  <Img
                    mt="10px"
                    src={thread.image}
                    width="100%"
                    height="auto"
                    objectFit="contain"
                  />
                )}
                <Flex mt="10px" color="gray.500" fontSize="sm">
                  <Flex
                    fontFamily="Plus Jakarta Sans"
                    fontWeight="400"
                    fontSize="12px"
                    alignItems="center"
                    mr="20px"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(thread.id);
                    }}
                    cursor="pointer"
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
          );
        })}
    </>
  );
}
