"use client";

import { Flex, Box, Text, Spacer, IconButton, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useAppSelector } from "@/redux/hooks";
import { FaBars, FaRegClock, FaShieldAlt } from "react-icons/fa";

type Props = {
  onToggle: () => void;
};

const TopMenu: React.FC<Props> = ({ onToggle }) => {
  const [time, setTime] = useState<Date | null>(null);
  const sessions = useAppSelector((state) => state.sessions.activeSessions);

  useEffect(() => {
    setTime(new Date());

    const interval = setInterval(() => setTime(new Date()), 1000);

    return () => clearInterval(interval);
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
        <Box fontWeight="bold">INVENTORY</Box>
      </Flex>
      <Box ml={4} fontWeight="bold">
        Sessions: {sessions}
      </Box>
      <Spacer />
      <Box>
        {time && (
          <Box display="flex" gap="40px">
            <Box>
              <Text>Today</Text>
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
    </Flex>
  );
};

export default TopMenu;
