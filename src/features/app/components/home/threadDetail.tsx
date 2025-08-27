import {
  Avatar,
  Box,
  Flex,
  Icon,
  Img,
  Text,
} from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { BiMessageSquareDetail } from "react-icons/bi";
import { ThreadEntity } from "../../../../entities/thread";

interface ThreadDetailProps {
  selectedThread: ThreadEntity;
  likes: Record<number, { isLiked: boolean; likesCount: number }>;
  handleLike: (threadId: number) => void;
}

export function ThreadDetail({ selectedThread, likes, handleLike }: ThreadDetailProps) {
  return (
    <Flex padding="12px 16px" key={selectedThread.id} width="calc(100% - 32px)">
      <Box>
        <Avatar
          size="sm"
          cursor="pointer"
          src={selectedThread.user.image}
          name={selectedThread.user.fullName}
        />
      </Box>
      <Box ml="10px" width="100%">
        <Flex>
          <Text fontWeight="700" fontFamily="Plus Jakarta Sans" fontSize="12px">
            {selectedThread.user.fullName}
          </Text>
          <Text
            ml="5px"
            mb="5px"
            fontFamily="Plus Jakarta Sans"
            fontSize="12px"
            color="gray.500"
          >
            @{selectedThread.user.username}{" "}
            <Text as="span" color="gray.500" ml="1px" mr="1px">•</Text>{" "}
            {new Date(selectedThread.createdAt).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
            })}
          </Text>
        </Flex>

        {/* Content */}
        <Text
          fontSize="12px"
          fontFamily="Plus Jakarta Sans"
          fontWeight="400"
          color="white"
        >
          {selectedThread.content}
        </Text>

        <Text
          fontSize="11px"
          mt="5px"
          fontFamily="Plus Jakarta Sans"
          fontWeight="400"
          color="gray.500"
        >
          {new Date(selectedThread.createdAt).toLocaleString("en-US", {
            hour12: true,
            hour: "numeric",
            minute: "numeric",
          })}
          <Text as="span" color="gray.500" ml="2px" mr="2px">•</Text>
          {new Date(selectedThread.createdAt).toDateString()}
        </Text>

        {/* Image */}
        {selectedThread.image && (
          <Img
            mt="10px"
            src={selectedThread.image}
            width="400px"
            height="300px"
            objectFit="contain"
          />
        )}

        {/* Like & Reply Count */}
        <Flex mt="10px" color="gray.500" fontSize="sm">
          <Flex
            onClick={() => handleLike(selectedThread.id)}
            cursor="pointer"
            fontFamily="Plus Jakarta Sans"
            fontWeight="400"
            fontSize="12px"
            alignItems="center"
            mr="20px"
          >
            <Icon
              as={likes[selectedThread.id]?.isLiked ? FcLike : FaRegHeart}
              mr="5px"
            />
            {selectedThread.likes?.length || 0}
          </Flex>
          <Flex
            fontFamily="Plus Jakarta Sans"
            fontWeight="400"
            fontSize="12px"
            alignItems="center"
            mr="20px"
          >
            <Icon as={BiMessageSquareDetail} mr="5px" />
            {selectedThread.replies?.length || 0} Replies
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
