"use client";

import { Box, Flex, Link, VStack } from "@chakra-ui/react";
import { FaHome, FaBox, FaClipboardList } from "react-icons/fa";
import { useTranslations } from "next-intl";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const t = useTranslations("sidebar");

  return (
    <Flex>
      <Box
        as="nav"
        position="fixed"
        left={0}
        h="100vh"
        w={isOpen ? "250px" : "0px"}
        bg="gray.800"
        color="white"
        transition="width 0.3s ease"
        overflow="hidden"
        boxShadow="lg"
        zIndex={20}
      >
        <VStack align="start" p={4} spacing={4}>
          <Flex align="center" w="100%">
            <FaHome />
            <Link
              href="/"
              ml={2}
              opacity={isOpen ? 1 : 0}
              transition="opacity 0.2s, margin-left 0.3s"
              cursor="pointer"
              _hover={{ textDecoration: "none", color: "gray.400" }}
            >
              {t("home")}
            </Link>
          </Flex>
          <Flex align="center" w="100%">
            <FaClipboardList />
            <Link
              href="/orders"
              ml={2}
              opacity={isOpen ? 1 : 0}
              transition="opacity 0.2s, margin-left 0.3s"
              cursor="pointer"
              _hover={{ textDecoration: "none", color: "gray.400" }}
            >
              {t("orders")}
            </Link>
          </Flex>
          <Flex align="center" w="100%">
            <FaBox />
            <Link
              href="/products"
              ml={2}
              opacity={isOpen ? 1 : 0}
              transition="opacity 0.2s, margin-left 0.3s"
              cursor="pointer"
              _hover={{ textDecoration: "none", color: "gray.400" }}
            >
              {t("products")}
            </Link>
          </Flex>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Sidebar;
