import { Inter } from "next/font/google";
import "./globals.css";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import ClientProviders from "../components/ClientProviders/ClientProviders";
import TopMenu from "@/components/TopMenu/TopMenu";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Box, useDisclosure } from "@chakra-ui/react";
import { useAppSelector } from "@/redux/hooks";

const inter = Inter({ subsets: ["latin"] });

// eslint-disable-next-line @next/next/no-async-client-component
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <title>Orders & Products App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ClientProviders>{children}</ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
