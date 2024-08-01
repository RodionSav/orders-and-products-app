import { Box, Heading, Text, VStack, Flex } from "@chakra-ui/react";
import React from "react";
import { Order } from "@/types/types";
import { useTranslations } from "next-intl";

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const t = useTranslations("orderDetails");

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
        {t("heading")}
      </Heading>
      <VStack align="start" spacing={2}>
        <Text>
          <strong>{t("title")}:</strong> {order.title}
        </Text>
        <Text>
          <strong>{t("date")}:</strong> {order.date}
        </Text>
        <Text>
          <strong>{t("description")}:</strong> {order.description}
        </Text>
        <Flex>
          <Text>
            <strong>{t("products")}:</strong>
          </Text>
          {order.products.length ? (
            <VStack align="start" pl={4}>
              {order.products.map((product) => (
                <Text key={product.id}>
                  {product.title} ({product.type})
                </Text>
              ))}
            </VStack>
          ) : (
            <Text>
              {t("noProducts")}
            </Text>
          )}
        </Flex>
      </VStack>
    </Box>
  );
};

export default OrderDetails;
