"use client";

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
import { UseFormRegister, UseFormHandleSubmit } from "react-hook-form";

type ThreadFormProps = {
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  image: string | null;
  show: boolean;
  setShow: (value: boolean) => void;
  handleChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ThreadForm({
  register,
  handleSubmit,
  onSubmit,
  isSubmitting,
  image,
  show,
  setShow,
  handleChangeImage,
}: ThreadFormProps) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex padding="5px 20px 5px 20px" align="center">
        <Avatar
          size="sm"
          src="https://res.cloudinary.com/db2rr1kej/image/upload/v1728142149/uploads/o8ivurqezrpbzwpj7k0y.png"
          name="Mohammed Jawahir"
        />
        <Box ml="10px" width="100%">
          <Input
            size={"sm"}
            border="none"
            _focus={{ border: "none", boxShadow: "none" }}
            borderRadius="5px"
            backgroundColor="#1D1D1D"
            type="text"
            placeholder="What is happening?!"
            _placeholder={{ color: "brand.text-input" }}
            color={"white"}
            {...register("content")}
          />
        </Box>
        <Flex alignItems="center" justifyContent="space-between">
          <FormControl display="flex" alignItems="center">
            <FormLabel
              cursor={"pointer"}
              size={"md"}
              color={"brand.green"}
              bg={"none"}
              _hover={{ bg: "none" }}
              mb="0"
            >
              <GrGallery />
            </FormLabel>
            <Input
              hidden
              type="file"
              accept="image/*"
              {...register("image", { onChange: handleChangeImage })}
            />
          </FormControl>
        </Flex>
        <Button
          type="submit"
          mr="7px"
          size={"sm"}
          bg={"brand.green-disabled"}
          fontSize={"11px"}
          fontWeight={"500"}
          color={"white"}
          padding={"8px 16px"}
          _active={{ bg: "brand.green" }}
          borderRadius={"30px"}
          _hover={{ bg: "brand.green" }}
          position="relative"
        >
          {isSubmitting ? (
            <Spinner
              size={"sm"}
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
        <Box position="relative" ml={"75px"} mb={"20px"}>
          <Img
            src={image || ""}
            width={"350px"}
            height={"390px"}
            borderRadius={"10px"}
            objectFit={"contain"}
          />
          <Icon
            as={IoIosCloseCircle}
            color="white"
            position="absolute"
            top="10px"
            fontSize={"20px"}
            right="120px"
            cursor="pointer"
            _hover={{ color: "white" }}
            zIndex="10"
            onClick={() => setShow(false)}
          />
        </Box>
      )}
    </form>
  );
}
