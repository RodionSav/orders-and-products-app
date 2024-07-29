import React from "react";
import { Box, Flex, Text, Button, HStack } from "@chakra-ui/react";
import { Order } from "../../types/types";
import { DeleteIcon } from "@chakra-ui/icons";

interface OrderItemProps {
  order: Order;
  onView: (order: Order) => void;
  onDelete: (order: Order) => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const OrderItem: React.FC<OrderItemProps> = ({ order, onView, onDelete }) => {
  return (
    <Box
      display="flex"
      bgColor="white"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      mb={4}
    >
      <Flex flex="1" direction="row" gap="15px" alignItems="center">
        <Flex direction="row" justifyContent="space-between" flex="1">
          <Text fontWeight="bold">{order.title}</Text>
          <Text>Продукты: {order.products.length}</Text>
          <Text>{formatDate(order.date)}</Text>
        </Flex>
        <HStack spacing={4}>
          <Button size="sm" colorScheme="teal" onClick={() => onView(order)}>
            View
          </Button>
          <Button
            size="sm"
            onClick={() => onDelete(order)}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgColor='none'
            p={2}
          >
            <DeleteIcon />
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default OrderItem;
