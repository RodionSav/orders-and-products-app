"use client";

import React, { useState, useEffect, lazy, Suspense } from "react";
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
import * as orderActions from "../../components/features/ordersSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useTranslations } from "next-intl";

const OrderItem = lazy(() => import("../../components/OrderItem/OrderItem"));
const CreateItemForm = lazy(() => import("../../components/CreateItem/CreateItemForm"));
const DeleteOrderModal = lazy(() => import("../../components/DeleteModal/DeleteOrderModal"));
const OrderDetails = lazy(() => import("@/components/OrderDetails/OrderDetails"));

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      dispatch(orderActions.loadOrdersFromLocalStorage());
    }
  }, [dispatch]);

  const handleSelectOrder = (order: Order) => {
    if (selectedOrder?.id !== order.id) {
      setSelectedOrder(order);
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
            <Suspense fallback={<div>{t("orderLoading")}</div>}>
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
            </Suspense>
          </Flex>
        </Box>
        <Suspense fallback={<div>{t("detailsLoading")}</div>}>
          {selectedOrder && <OrderDetails order={selectedOrder} />}
        </Suspense>
      </Flex>
      <Suspense fallback={<div>{t("modalLoading")}</div>}>
        {orderToDelete && (
          <DeleteOrderModal
            isOpen={isDeleteOpen}
            onClose={onDeleteClose}
            onDelete={confirmDeleteOrder}
            order={orderToDelete}
          />
        )}
        {isCreateOpen && <CreateItemForm onClose={onCreateClose} />}
      </Suspense>
    </Box>
  );
};

export default Orders;
