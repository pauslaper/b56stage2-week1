import {
  Flex
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../hooks/use-store";
import "../styles/styles.css";
import { DevelopedBy } from "./developedBy";
import { ProfileRight } from "./profile-right";
import { SuggestForYou } from "./sugggest-for-you";

export interface RigthBarProps {
  isProfileVisible: boolean;
  onEditProfileClick: () => void;
}

export function RightBar({
  isProfileVisible,
  onEditProfileClick,
}: RigthBarProps) {
  const location = useLocation();

  return (
    <Flex
      direction="column"
      width="410px"
      height="100vh"
      bg="brand.bg"
      padding="10px 50px 10px 40px"
      color="white"
      border="1px solid #545454"
      position="fixed"
      right="0"
      top="0"
    >
      {location.pathname !== "/profile" && (
        <ProfileRight
          isProfileVisible={!isProfileVisible}
          onEditProfileClick={onEditProfileClick}
        />
      )}
      <SuggestForYou userId={useAppSelector((state) => state.auth.id)} />
      <DevelopedBy />
    </Flex>
  );
}




