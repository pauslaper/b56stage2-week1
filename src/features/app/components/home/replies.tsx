import {
  Avatar,
  Box,
  Flex,
  Icon,
  Img,
  Text,
} from "@chakra-ui/react";
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";
import { ReplyEntity } from "../../../../entities/thread";

interface RepliesProps {
  replyData: ReplyEntity[];
  replyLikes: Record<number, { isLiked: boolean; likesCount: number }>;
  handleLikeReply: (replyId: number) => void;
}

export function Replies({ replyData, replyLikes, handleLikeReply }: RepliesProps) {
  if (!Array.isArray(replyData) || replyData.length === 0) {
    return (
      <Box mt="10px" textAlign="center" color="gray.500" fontSize="sm">
        No replies yet
      </Box>
    );
  }

  return (
    <>
      {replyData.map((reply) => {
        const replyLike = replyLikes[reply.id] || {
          isLiked: false,
          likesCount: reply.likes?.length || 0,
        };

        return (
          <Box key={reply.id}>
            <Flex border={"1px solid #545454"} padding="12px 16px">
              <Avatar
                size="sm"
                src={reply.user.image}
                name={reply.user.fullName}
              />
              <Box ml="10px" width="100%">
                {/* User Info */}
                <Flex>
                  <Text
                    fontWeight="700"
                    fontFamily={"Plus Jakarta Sans"}
                    fontSize="12px"
                  >
                    {reply.user.fullName}
                  </Text>
                  <Text
                    ml="5px"
                    mb={"5px"}
                    fontFamily={"Plus Jakarta Sans"}
                    fontSize="12px"
                    color="gray.500"
                  >
                    @{reply.user.username}{" "}
                    <Text as="span" color="gray.500" ml="1px" mr="1px">
                      •
                    </Text>
                    {new Date(reply.createdAt).toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </Text>
                </Flex>

                {/* Reply Content */}
                <Text
                  fontSize="12px"
                  fontFamily={"Plus Jakarta Sans"}
                  fontWeight="400"
                  color="white"
                >
                  {reply.content}
                </Text>

                {reply.image && reply.image !== "" && (
                  <Img
                    mt="10px"
                    src={reply.image}
                    width="380px"
                    height="300px"
                    objectFit={"contain"}
                  />
                )}

                {/* Like Button */}
                <Flex mt="10px" color="gray.500" fontSize="sm">
                  <Flex
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLikeReply(reply.id);
                    }}
                    cursor={"pointer"}
                    fontFamily={"Plus Jakarta Sans"}
                    fontWeight="400"
                    fontSize={"12px"}
                    alignItems="center"
                    mr="20px"
                  >
                    <Icon as={replyLike.isLiked ? FcLike : FaRegHeart} mr="5px" />
                    {reply.likes?.length || 0}
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </Box>
        );
      })}
    </>
  );
}
