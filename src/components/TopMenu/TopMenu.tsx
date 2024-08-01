"use client";

import {
  Flex,
  Box,
  Text,
  Spacer,
  IconButton,
  Icon,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { FaBars, FaRegClock, FaShieldAlt } from "react-icons/fa";
import { useTranslations } from "next-intl";
import * as sessionActions from "../features/sessionSlice";
import { cookies } from "next/headers";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";

type Props = {
  onToggle: () => void;
};

const TopMenu: React.FC<Props> = ({ onToggle }) => {
  const t = useTranslations("navigation");
  const [time, setTime] = useState<Date | null>(null);
  const sessions = useAppSelector((state) => state.sessions.activeSessions);
  const dispatch = useAppDispatch();



  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

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
      <LanguageSwitch />

    </Flex>
  );
};

export default TopMenu;
