"use client";

import { ChakraProvider, theme, Box } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import TopMenu from "@/components/TopMenu/TopMenu";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useDisclosure } from "@chakra-ui/react";

interface ClientProvidersProps {
  children: ReactNode;
}

const ClientProviders: React.FC<ClientProvidersProps> = ({ children }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Box bg="gray.100" minHeight="100vh">
          <TopMenu onToggle={onToggle} />
          <Sidebar isOpen={isOpen} />
          <Box p={4}>{children}</Box>
        </Box>
      </Provider>
    </ChakraProvider>
  );
};

export default ClientProviders;
