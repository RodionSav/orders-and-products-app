"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { Order } from "@/types/types";
import OrderItem from "../../components/OrderItem/OrderItem";
import CreateItemForm from "../../components/CreateItem/CreateItemForm";
import DeleteOrderModal from "@/components/DeleteModal/DeleteOrderModal";
import OrderDetails from "@/components/OrderDetails/OrderDetails";
import * as orderActions from "../../components/features/ordersSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useTranslations } from "next-intl";

const Orders: React.FC = () => {
  const orders = useAppSelector((state) => state.orders.orders);
  const dispatch = useAppDispatch();
  const t = useTranslations('orders');

  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  React.useEffect(() => {
    // @ts-ignore
    dispatch(orderActions.loadOrdersFromLocalStorage());
  }, [dispatch]);

  const handleSelectOrder = (order: Order) => {
    if (selectedOrder?.id !== order.id) {
      setSelectedOrder(order); // Select new order
    } else {
      setSelectedOrder(null);
    }
  };

  const handleCreateOrder = () => {
    onCreateOpen();
  };

  const handleDeleteOrder = (order: Order) => {
    setOrderToDelete(order);
    onDeleteOpen();
  };

  const confirmDeleteOrder = () => {
    if (orderToDelete) {
      // @ts-ignore
      dispatch(orderActions.removeOrderFromLocalStorage(orderToDelete.id));
      setOrderToDelete(null);
      onDeleteClose();
    }
  };

  return (
    <Box p={4} position="relative">
      <Flex gap={4}>
        <Box flex="1" display="flex" flexDirection="column">
          <Box display="flex" gap="15px">
            <Button
              onClick={handleCreateOrder}
              boxSize={50}
              borderRadius="full"
              bg="green.500"
              color="white"
              _hover={{ bg: "green.600" }}
              boxShadow="md"
              aria-label="Create new order"
              iconSpacing={0}
            >
              <FaPlus />
            </Button>
            <Heading as="h1" mb={4}>
              {t("items")} / {orders.length || 0}
            </Heading>
          </Box>
          <Flex direction="column">
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrderItem
                  key={order.id}
                  order={order}
                  onView={() => handleSelectOrder(order)}
                  onDelete={() => handleDeleteOrder(order)}
                />
              ))
            ) : (
              <Text>{t("noItems")}</Text>
            )}
          </Flex>
        </Box>
        {selectedOrder && <OrderDetails order={selectedOrder} />}
      </Flex>
      {orderToDelete && (
        <DeleteOrderModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          onDelete={confirmDeleteOrder}
          order={orderToDelete}
        />
      )}
      {isCreateOpen && <CreateItemForm onClose={onCreateClose} />}
    </Box>
  );
};

export default Orders;
