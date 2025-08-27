import {
    Box,
    Icon,
    Image,
    Text
} from "@chakra-ui/react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../styles/styles.css";

export function DevelopedBy() {
  return (
    <Box
      mt={"13px"}
      backgroundColor={"brand.profile"}
      height={"75px"}
      width={"340px"}
      position={"relative"}
      padding={"6px 0px 12px 0px"}
      borderRadius={"md"}
    >
      <Text
        fontSize={"12px"}
        padding={"3px 15px"}
        mb={"5px"}
        fontFamily={"Plus Jakarta Sans"}
        fontWeight={"500"}
        display={"flex"}
        alignItems={"center"}
      >
        Developed by Alfin Dwi{" "}
        <Text ml={"5px"} fontSize={"12px"} color={"#B2B2B2"} as={"span"}>
          •
        </Text>
        <a
          style={{ display: "flex", alignItems: "center" }}
          href="https://github.com/pauslaper"
        >
          <Icon fontSize={"md"} ml={"10px"} color={"#B2B2B2"} as={FaGithub} />
        </a>
        <a
          style={{ display: "flex", alignItems: "center" }}
          href="https://www.linkedin.com/in/alvin-dwi-a20452308/"
        >
          <Icon fontSize={"md"} ml={"10px"} color={"#B2B2B2"} as={FaLinkedin} />
        </a>
        <a
          style={{ display: "flex", alignItems: "center" }}
          href="https://www.facebook.com/alvin.dwi.10297?locale=id_ID"
        >
          <Icon fontSize={"md"} ml={"10px"} color={"#B2B2B2"} as={FaFacebook} />
        </a>
        <a
          style={{ display: "flex", alignItems: "center" }}
          href="https://www.instagram.com/alvindvvi/"
        >
          <Icon
            fontSize={"md"}
            ml={"10px"}
            color={"#B2B2B2"}
            as={FaInstagram}
          />
        </a>
      </Text>
      <Text
        fontSize={"9px"}
        padding={"0px 15px"}
        fontFamily={"Plus Jakarta Sans"}
        fontWeight={"500"}
        display={"flex"}
        alignItems={"center"}
      >
        Powered by{" "}
        <Image
          ml={"5px"}
          mr={"5px"}
          src="https://res.cloudinary.com/db2rr1kej/image/upload/v1728067866/uploads/heoqhnkhffnqknxltbju.png"
          width={"17px"}
          height={"9px"}
          alt=""
        />{" "}
        DumbWays Indonesia • #1 Coding Bootcamp
      </Text>
    </Box>
  );
}
