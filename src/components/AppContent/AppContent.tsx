import { Box, useDisclosure } from "@chakra-ui/react";
import TopMenu from "@/components/TopMenu/TopMenu";
import Sidebar from "@/components/Sidebar/Sidebar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
}

const AppContent: React.FC<Props> = ({ children }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <TopMenu onToggle={onToggle} />
      {isOpen && <Sidebar isOpen={isOpen} />}
      <Box p={4}>{children}</Box>
    </>
  );
};

export default AppContent;
