import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Img,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { GrGallery } from "react-icons/gr";
import { IoIosCloseCircle } from "react-icons/io";

interface ReplyFormProps {
  reply: any; 
  replySubmit: any; 
  replyOnSubmit: (data: any) => void;
  replyIsSubmitting: boolean;
  handleChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  show: boolean;
  setShow: (show: boolean) => void;
  image: string | null;
}

export function ReplyForm({
  reply,
  replySubmit,
  replyOnSubmit,
  replyIsSubmitting,
  handleChangeImage,
  show,
  setShow,
  image,
}: ReplyFormProps) {
  return (
    <form onSubmit={replySubmit(replyOnSubmit)}>
      <Flex padding="5px 20px" border="1px solid #545454" direction="column">
        <Flex align="center">
          <Avatar
            size="sm"
            src="https://res.cloudinary.com/db2rr1kej/image/upload/v1728142149/uploads/o8ivurqezrpbzwpj7k0y.png"
            name="Mohammed Jawahir"
          />
          <Input
            ml="10px"
            size="sm"
            {...reply("content")}
            border="none"
            _focus={{ border: "none", boxShadow: "none" }}
            borderRadius="5px"
            backgroundColor="#1D1D1D"
            type="text"
            placeholder="Type your reply!"
            _placeholder={{ color: "brand.text-input" }}
            color="white"
          />
          <Flex alignItems="center" justifyContent="space-between">
            <FormControl display="flex" alignItems="center">
              <FormLabel cursor="pointer" size="md" color="brand.green" bg="none" _hover={{ bg: "none" }} mb="0">
                <GrGallery />
              </FormLabel>
              <Input
                hidden
                type="file"
                {...reply("image", { onChange: handleChangeImage })}
              />
            </FormControl>
          </Flex>
          <Button
            type="submit"
            mr="7px"
            size="sm"
            bg="brand.green-disabled"
            fontSize="11px"
            fontWeight="500"
            color="white"
            padding="8px 16px"
            _active={{ bg: "brand.green" }}
            borderRadius="30px"
            _hover={{ bg: "brand.green" }}
            position="relative"
          >
            {replyIsSubmitting ? (
              <Spinner
                size="sm"
                position="absolute"
                top="30%"
                left="27%"
                transform="translate(-50%, -50%)"
              />
            ) : (
              "Post"
            )}
          </Button>
        </Flex>
        {show && (
          <Box
            display="flex"
            ml="46px"
            mb="20px"
            dir="column"
            position="relative"
            mt="20px"
          >
            <Img
              src={image || ""}
              width="380px"
              height="380px"
              ml="10px"
              borderRadius="10px"
              objectFit="contain"
            />
            <Icon
              as={IoIosCloseCircle}
              color="white"
              position="absolute"
              top="10px"
              fontSize="20px"
              right="80px"
              cursor="pointer"
              _hover={{ color: "white" }}
              zIndex="10"
              onClick={() => setShow(false)}
            />
          </Box>
        )}
      </Flex>
    </form>
  );
}
