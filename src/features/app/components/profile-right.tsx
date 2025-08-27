import {
    Avatar,
    Box,
    Button,
    Flex,
    Image,
    Text
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../hooks/use-store";
import { fetchDummyUsers } from "../../../store/auth-slice";
import { fetchFolloweds } from "../../../store/following-slice";
import {
    fetchFollowers
} from "../../../store/follows-slice";
import { RootState } from "../../../store/store";
import "../styles/styles.css";
import { RigthBarProps } from "./right-bar";

export function ProfileRight({ onEditProfileClick }: RigthBarProps) {
  const dispatch = useAppDispatch();

  const { username, fullName, image, bio, backgroundImage } = useAppSelector(
    (state) => state.auth
  );
  const { following } = useSelector((state: RootState) => state.following);
  const { followers } = useSelector((state: RootState) => state.follows);

  useEffect(() => {
    dispatch(fetchFollowers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFolloweds());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDummyUsers());
  }, [dispatch]);

  return (
    <Box
      mr={"10px"}
      backgroundColor={"brand.profile"}
      height={"235px"}
      width={"340px"}
      position={"relative"}
      padding={"5px 0px 12px 0px"}
      borderRadius={"md"}
    >
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Text
          padding={"5px 20px"}
          fontFamily={"Plus Jakarta Sans"}
          fontWeight={"550"}
          fontSize={"14px"}
        >
          My Profile
        </Text>
        <Image
          src={
            backgroundImage ||
            "https://res.cloudinary.com/db2rr1kej/image/upload/v1728136949/uploads/dxudu0wusd9ww8r3chjw.png"
          }
          width="435px"
          height={"65px"}
          padding={"0px 15px"}
          borderRadius="3xl"
        />
        <Avatar
          size="lg"
          position={"absolute"}
          top={"42%"}
          left={"10%"}
          transform={"translate(-50%, -50%)"}
          zIndex={"1"}
          border={"2px solid black"}
          margin={"0px 30px"}
          src={image}
          name={fullName}
        />

        <Button
          left={"73%"}
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

        <Box margin={"10px 10px"}>
          <Text
            fontFamily={"Plus Jakarta Sans"}
            fontSize={"18px"}
            fontWeight={"700"}
          >
            {fullName}
          </Text>
          <Text
            fontFamily={"Plus Jakarta Sans"}
            fontSize={"10px"}
            color={"#909090"}
          >
            @{username}
          </Text>
          <Text
            fontSize={"13px"}
            fontFamily={"Plus Jakarta Sans"}
            fontWeight={"400"}
          >
            {bio}
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
