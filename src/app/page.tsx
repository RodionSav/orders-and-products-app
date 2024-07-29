import TopMenu from "@/components/TopMenu/TopMenu";
import { store } from "@/redux/store";
import { Box, ChakraProvider, Flex, Heading, Link, theme } from "@chakra-ui/react";
import Image from "next/image";
import { Provider } from "react-redux";
import Orders from "./orders/page";

export default function Home() {
  return (
      <Orders />
  );
}
