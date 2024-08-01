import React from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Order } from "@/types/types";
import { useTranslations } from "next-intl";

type DeleteOrderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  order: Order | null;
};

const DeleteOrderModal: React.FC<DeleteOrderModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  order,
}) => {
  const t = useTranslations('orders');

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {t("areYouSureDelete")}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display="flex" alignItems="center" mb={4}>
            {order && (
              <>
                <Box>
                  <Text fontWeight="bold">{order.title}</Text>
                  <Text fontWeight="regular">{order.description}</Text>
                </Box>
              </>
            )}
          </Box>
        </ModalBody>
        <ModalFooter
          gap="15px"
          justifyContent="end"
          bg="green.300"
          borderBottomRadius="md"
        >
          <Button
            onClick={onClose}
            variant="outline"
            border="none"
            color="white"
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={onDelete}
            bgColor="white"
            colorScheme="white"
            borderRadius="20px"
            color="red"
            leftIcon={<DeleteIcon />}
          >
            {t("confirmDelete")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteOrderModal;
