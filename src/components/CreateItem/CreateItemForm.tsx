"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Select,
  useToast,
  CloseButton,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addOrder } from "../features/ordersSlice";

interface Product {
  id: number;
  serialNumber: number;
  isNew: number;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: {
    start: string;
    end: string;
  };
  price: {
    value: number;
    symbol: string;
    isDefault: number;
  }[];
  order: number;
  date: string;
}

interface Order {
  id: number;
  title: string;
  date: string;
  description: string;
  products: Product[];
}

type Props = {
  onClose: () => void;
};

export const CreateOrderForm: React.FC<Props> = ({ onClose }) => {
  const [order, setOrder] = useState<Omit<Order, "date">>({
    id: 0,
    title: "",
    description: "",
    products: [],
  });

  const dispatch = useAppDispatch();
  const toast = useToast();

  const products = useAppSelector((state) => state.products.products);
  const orders = useAppSelector((state) => state.orders.orders);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  // Handle product selection
  const handleProductSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = parseInt(e.target.value);
    const selectedProduct = products.find(
      (product) => product.id === productId
    );
    if (
      selectedProduct &&
      !order.products.some((product) => product.id === selectedProduct.id)
    ) {
      setOrder((prevOrder) => ({
        ...prevOrder,
        products: [...prevOrder.products, selectedProduct],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!order.title || !order.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const currentDate = new Date().toISOString();

    const newOrder: Order = {
      ...order,
      id: orders.length ? orders[orders.length - 1].id + 1 : 1,
      date: currentDate,
    };

    dispatch(addOrder(newOrder));
    toast({
      title: "Order Created",
      description: "Your order has been created successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setOrder({
      id: 0,
      title: "",
      description: "",
      products: [],
    });
    onClose();
  };

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      bg="rgba(0, 0, 0, 0.5)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex="999"
    >
      <Box
        maxW="500px"
        w="100%"
        p={6}
        bg="white"
        boxShadow="md"
        borderRadius="md"
        position="relative"
        zIndex="1000"
      >
        <form onSubmit={handleSubmit}>
          <CloseButton
            position="absolute"
            top="10px"
            right="10px"
            width="30px"
            height="30px"
            onClick={onClose}
            size="lg"
            aria-label="Close form"
            cursor="pointer"
          />
          <VStack spacing={4}>
            <FormControl id="title" isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                placeholder="Enter order title"
                value={order.title}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="description" isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                placeholder="Enter order description"
                value={order.description}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="products">
              <FormLabel>Products</FormLabel>
              <Select
                placeholder="Select a product"
                onChange={handleProductSelect}
              >
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.title} - {product.type}
                  </option>
                ))}
              </Select>
              <VStack mt={2} align="start">
                {order.products.map((product) => (
                  <Box key={product.id} p={2} bg="gray.100" borderRadius="md">
                    {product.title} ({product.type})
                  </Box>
                ))}
              </VStack>
            </FormControl>

            <Button type="submit" colorScheme="green" size="lg" width="100%">
              Create Order
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default CreateOrderForm;
