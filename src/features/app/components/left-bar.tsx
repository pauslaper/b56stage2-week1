import {
  Button,
  Flex,
  Text
} from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { RiUserSearchLine } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/use-store";
import { logout } from "../../../store/auth-slice";
import "../styles/styles.css";

interface LeftBarProps {
  onOpenCreatePost: () => void;
}

export function LeftBar({ onOpenCreatePost }: LeftBarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/login");
  };

  return (
    <Flex
      direction="column"
      width="325px"
      height="100vh"
      bg="brand.bg"
      padding="9px"
      color="white"
      position="fixed"
      border="1px solid #545454"
    >
      <Text
        fontSize={"3xl"}
        ml={"19px"}
        color={"brand.green"}
        fontFamily={"Plus Jakarta Sans"}
        mb="20px"
        fontWeight={"bold"}
      >
        circle
      </Text>
      <Button
        as={ReactRouterLink}
        to="/"
        bg={"none"}
        leftIcon={<IoHomeOutline fontSize="20px" />}
        _active={{ bg: "#B2B2B2" }}
        fontWeight={"500"}
        textDecoration={"none"}
        display={"flex"}
        justifyContent={"start"}
        padding={"10px 20px"}
        color={"white"}
        mb={"10px"}
        fontFamily={"Plus Jakarta Sans"}
        _hover={{ textDecoration: "none", bg: "#303030" }}
      >
        Home
      </Button>
      <Button
        as={ReactRouterLink}
        to="/search"
        bg={"none"}
        leftIcon={<RiUserSearchLine fontSize="20px" />}
        _active={{ color: "#B2B2B2" }}
        fontWeight={"500"}
        display={"flex"}
        justifyContent={"start"}
        padding={"10px 20px"}
        color={"white"}
        mb={"10px"}
        fontFamily={"Plus Jakarta Sans"}
        _hover={{ textDecoration: "none", bg: "#303030" }}
      >
        Search
      </Button>
      <Button
        as={ReactRouterLink}
        to="/follows"
        bg={"none"}
        leftIcon={<FaRegHeart fontSize="20px" />}
        _active={{ color: "#B2B2B2" }}
        fontWeight={"500"}
        display={"flex"}
        justifyContent={"start"}
        padding={"10px 20px"}
        color={"white"}
        mb={"10px"}
        fontFamily={"Plus Jakarta Sans"}
        _hover={{ textDecoration: "none", bg: "#303030" }}
      >
        Follows
      </Button>
      <Button
        as={ReactRouterLink}
        to="/profile"
        bg={"none"}
        leftIcon={<CgProfile fontSize="20px" />}
        _active={{ color: "#B2B2B2" }}
        fontWeight={"500"}
        display={"flex"}
        justifyContent={"start"}
        padding={"10px 20px"}
        color={"white"}
        mb={"10px"}
        fontFamily={"Plus Jakarta Sans"}
        _hover={{ textDecoration: "none", bg: "#303030" }}
      >
        Profile
      </Button>
      <Button
        onClick={onOpenCreatePost}
        margin={"0px 10px"}
        color={"white"}
        _active={{ color: "brand.green" }}
        backgroundColor={"brand.green"}
        fontFamily={"Plus Jakarta Sans"}
        padding={"12px 16x"}
        gap={"10px"}
        borderRadius={"30px"}
        fontWeight={"semibold"}
        _hover={{ backgroundColor: "brand.green-disabled" }}
      >
        Create Post
      </Button>

      <Button
        onClick={handleLogout}
        leftIcon={<TbLogout2 fontSize="20px" />}
        bg={"transparent"}
        _active={{ color: "#B2B2B2" }}
        fontWeight={"500"}
        display={"flex"}
        justifyContent={"start"}
        padding={"10px 20px"}
        color={"white"}
        mt={"auto"}
        fontFamily={"Plus Jakarta Sans"}
        _hover={{ textDecoration: "none", bg: "#303030" }}
      >
        Logout
      </Button>
    </Flex>
  );
}


