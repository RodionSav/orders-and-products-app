"use client";

import { Box, Flex, Link, VStack } from "@chakra-ui/react";
import { FaHome, FaBox, FaClipboardList } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <Flex>
      <Box
        as="nav"
        position="fixed"
        left={0}
        h="100vh"
        w={isOpen ? "250px" : "60px"}
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
              transition="opacity 0.2s"
              cursor="pointer"
              _hover={{ textDecoration: "none", color: "gray.400" }}
            >
              Главная
            </Link>
          </Flex>
          <Flex align="center" w="100%">
            <FaClipboardList />
            <Link
              href="/orders"
              ml={2}
              opacity={isOpen ? 1 : 0}
              transition="opacity 0.2s"
              cursor="pointer"
              _hover={{ textDecoration: "none", color: "gray.400" }}
            >
              Заказы
            </Link>
          </Flex>
          <Flex align="center" w="100%">
            <FaBox />
            <Link
              href="/products"
              ml={2}
              opacity={isOpen ? 1 : 0}
              transition="opacity 0.2s"
              cursor="pointer"
              _hover={{ textDecoration: "none", color: "gray.400" }}
            >
              Продукты
            </Link>
          </Flex>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Sidebar;
