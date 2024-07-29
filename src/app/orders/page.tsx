"use client";

import React, { useState } from "react";
import { Box, Button, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Order } from "@/types/types";
import OrderItem from "../../components/OrderItem/OrderItem";
import CreateItemForm from "../../components/CreateItem/CreateItemForm";
import DeleteOrderModal from "@/components/DeleteModal/DeleteOrderModal";
import OrderDetails from "@/components/OrderDetails/OrderDetails";
import * as orderActions from "../../components/features/ordersSlice";

const Orders: React.FC = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const dispatch = useDispatch();

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

  // Load orders from localStorage on mount
  React.useEffect(() => {
    const loadOrders = () => {
      const ordersFromLocalStorage = localStorage.getItem('orders');
      if (ordersFromLocalStorage) {
        dispatch(orderActions.setOrders(JSON.parse(ordersFromLocalStorage)));
      }
    };

    if (typeof window !== "undefined") {
      loadOrders();
    }
  }, [dispatch]);

  // Handler to toggle order details view
  const handleSelectOrder = (order: Order) => {
    if (selectedOrder?.id !== order.id) {
      setSelectedOrder(order); // Select new order
    } else {
      setSelectedOrder(null);
    }
  };

  // Handler for creating a new order
  const handleCreateOrder = () => {
    onCreateOpen(); // Use the create modal's open handler
  };

  const handleDeleteOrder = (order: Order) => {
    setOrderToDelete(order); // Set the order to be deleted
    onDeleteOpen(); // Open the delete modal
  };

  const confirmDeleteOrder = () => {
    if (orderToDelete) {
      dispatch(orderActions.removeOrder(orderToDelete.id));
      setOrderToDelete(null); // Clear the order to be deleted
      onDeleteClose(); // Close the delete modal after confirming deletion
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
              Приходы / {orders.length || 0} {/* Avoid null */}
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
              <Text>Нет доступных заказов.</Text>
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
