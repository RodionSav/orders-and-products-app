// OrderDetails.tsx

import { Box, Heading, Text, VStack, Flex } from "@chakra-ui/react";
import React from "react";
import { Order } from "@/types/types";

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <Box
      flex="1"
      p={4}
      borderRadius="md"
      boxShadow="md"
      maxWidth="400px"
      bgColor="white"
    >
      <Heading as="h2" size="md" mb={4}>
        Order Details
      </Heading>
      <VStack align="start" spacing={2}>
        <Text>
          <strong>Title:</strong> {order.title}
        </Text>
        <Text>
          <strong>Date:</strong> {order.date}
        </Text>
        <Text>
          <strong>Description:</strong> {order.description}
        </Text>
        <Flex>
          <Text>
            <strong>Products:</strong>
          </Text>
          {order.products.length ? (<VStack align="start" pl={4}>
            {order.products.map((product) => (
              <Text key={product.id}>
                {product.title} ({product.type})
              </Text>
            ))}
          </VStack>) : (
            <Text>
              Нету продуктов
            </Text>
          )}
        </Flex>
      </VStack>
    </Box>
  );
};

export default OrderDetails;
