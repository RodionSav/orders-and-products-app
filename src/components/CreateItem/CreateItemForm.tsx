"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
  CloseButton,
} from "@chakra-ui/react";
import Select from "react-select";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import * as orderActions from "../features/ordersSlice";
import * as productActions from "../features/productsSlice";
import { useTranslations } from "next-intl";

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
  const products = useAppSelector((state) => state.products.products);
  const toast = useToast();
  const t = useTranslations("orders");
  const productTranslations = useTranslations("products");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!order.title || !order.description) {
      toast({
        title: t("validationError"),
        description: t("validationErrorMessage"),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const newOrder = {
      ...order,
      id: Date.now(),
      date: new Date().toISOString(),
    };

    // @ts-ignore
    dispatch(orderActions.addOrderToLocalStorage(newOrder));
    onClose();
    toast({
      title: t("orderCreated"),
      description: t("orderCreatedMessage"),
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  useEffect(() => {
    dispatch(productActions.loadProductsFromLocalStorage());
  }, [dispatch]);

  const handleProductChange = (selectedOptions: any) => {
    const selectedProducts = selectedOptions.map((option: any) => products.find(product => product.id === option.value));
    setOrder({
      ...order,
      products: selectedProducts,
    });
  };

  return (
    <Box
      p={4}
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bg="rgba(0,0,0,0.5)"
      zIndex="9999"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        position="relative"
        bg="white"
        p={4}
        borderRadius="md"
        boxShadow="md"
        width="100%"
        maxW="600px"
      >
        <CloseButton
          size="lg"
          onClick={onClose}
          color="red.500"
          position="absolute"
          top="10px"
          right="10px"
          zIndex="100"
        />
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="start">
            <FormControl>
              <FormLabel>{t("title")}</FormLabel>
              <Input
                value={order.title}
                onChange={(e) => setOrder({ ...order, title: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>{t("description")}</FormLabel>
              <Textarea
                value={order.description}
                onChange={(e) =>
                  setOrder({ ...order, description: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>{t("products")}</FormLabel>
              <Select
                isMulti
                options={products.map((product) => ({
                  value: product.id,
                  label: product.title,
                }))}
                onChange={handleProductChange}
                placeholder={productTranslations("chooseType")}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue">
              {t("createOrder")}
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default CreateOrderForm;
