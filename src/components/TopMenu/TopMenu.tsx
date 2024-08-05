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
import { format, Locale } from "date-fns";
import { ru, enUS } from "date-fns/locale";
import { FaBars, FaRegClock, FaShieldAlt } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { io, Socket } from "socket.io-client";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";

type Props = {
  onToggle: () => void;
};

const TopMenu: React.FC<Props> = ({ onToggle }) => {
  const t = useTranslations("navigation");
  const [time, setTime] = useState<Date | null>(null);
  const [sessions, setSessions] = useState<number>(0);
  const [currentLocale, setCurrentLocale] = useState<string>("en");

  const localeMap: Record<string, Locale> = {
    en: enUS,
    ru: ru,
  };

  const dateFnsLocale = localeMap[currentLocale] || enUS;

  useEffect(() => {
    const storedLocale = localStorage.getItem("locale");
    if (storedLocale) {
      setCurrentLocale(storedLocale);
    }

    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);

    const socket: Socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8001",
      { transports: ["websocket"] }
    );

    socket.on("sessionCount", (count: number) => {
      setSessions(count);
    });

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, []);

  const handleChangeLanguage = (newLang: string) => {
    localStorage.setItem("locale", newLang);
    setCurrentLocale(newLang);
    LanguageSwitch(newLang);
  };

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
                {format(time, "dd MMM, yyyy", { locale: dateFnsLocale })}
              </Text>
            </Box>
            <Box display="flex" alignItems="center" gap="8px" marginTop="24px">
              <FaRegClock color="green" />
              <Text>{format(time, "HH:mm", { locale: dateFnsLocale })}</Text>
            </Box>
          </Box>
        )}
      </Box>
      <Box ml={4}>
        <Button onClick={() => handleChangeLanguage("en")}>English</Button>
        <Button onClick={() => handleChangeLanguage("ru")} ml={2}>
          Русский
        </Button>
      </Box>
    </Flex>
  );
};

export default TopMenu;
