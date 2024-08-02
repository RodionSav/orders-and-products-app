"use client";

import {
  Flex,
  Box,
  Text,
  Spacer,
  IconButton,
  Icon,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { FaBars, FaRegClock, FaShieldAlt } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { io, Socket } from "socket.io-client";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";
import { Gamja_Flower } from "next/font/google";

type Props = {
  onToggle: () => void;
};

const TopMenu: React.FC<Props> = ({ onToggle }) => {
  const t = useTranslations("navigation");
  const [time, setTime] = useState<Date | null>(null);
  const [sessions, setSessions] = useState<number>(0);

  useEffect(() => {
    // Set current time and update it every second
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);

    // Initialize Socket.io client
    const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000", {transports: ['websocket']} );

    // Listen for session count updates
    socket.on("sessionCount", (count: number) => {
      setSessions(count);
    });

    // Clean up on component unmount
    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, []);

  return (
    <Flex bg="white" p={4} boxShadow="sm" align="center">
      <IconButton
        aria-label="Open menu"
        icon={<FaBars />}
        boxSize="50px"
        marginRight="16px"
        variant="ghost"
        onClick={onToggle}
      />
      <Flex align="center" gap="16px">
        <Icon as={FaShieldAlt} boxSize="40px" color="blue.500" />
        <Box fontWeight="bold">{t("inventory")}</Box>
      </Flex>
      <Box ml={4} fontWeight="bold">
        {t("sessions")}: {sessions}
      </Box>
      <Spacer />
      <Box>
        {time && (
          <Box display="flex" gap="40px">
            <Box>
              <Text>{t("today")}</Text>
              <Text textTransform="uppercase">
                {format(time, "dd MMM, yyyy")}
              </Text>
            </Box>
            <Box display="flex" alignItems="center" gap="8px" marginTop="24px">
              <FaRegClock color="green" />
              <Text>{format(time, "HH:mm")}</Text>
            </Box>
          </Box>
        )}
      </Box>
      <Box ml={4}>
        <Button onClick={() => LanguageSwitch("en")}>English</Button>
        <Button onClick={() => LanguageSwitch("ru")} ml={2}>
          Русский
        </Button>
      </Box>
    </Flex>
  );
};

export default TopMenu;
