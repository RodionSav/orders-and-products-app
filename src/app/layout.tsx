"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { Box, ChakraProvider, theme, useDisclosure } from "@chakra-ui/react";
import TopMenu from "@/components/TopMenu/TopMenu";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Providers } from "@/components/Providers/Providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <html lang="en">
      <head>
        <title>Orders & Products App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ChakraProvider theme={theme}>
          <Provider store={store}>
            <Providers>
              <Box bg="gray.100" minHeight="100vh">
                <TopMenu onToggle={onToggle} />
                {isOpen && <Sidebar isOpen={isOpen} />}
                <Box p={4}>{children}</Box>
              </Box>
            </Providers>
          </Provider>
        </ChakraProvider>
      </body>
    </html>
  );
}
