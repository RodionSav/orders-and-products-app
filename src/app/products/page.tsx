"use client";

import React, { useState, lazy, useEffect, Suspense } from "react";
import { Box, Flex, Heading, Select, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import * as productActions from "../../components/features/productsSlice";
import { useTranslations } from "next-intl";
import { Product } from "@/types/types";

const ProductItem = lazy(() => import("../../components/ProductItem/ProductItem"));

const Products: React.FC = () => {
  const products = useAppSelector((state) => state.products.products);
  const [filter, setFilter] = useState<string>("");
  const dispatch = useAppDispatch();
  const t = useTranslations("productsPage");

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    dispatch(productActions.loadProductsFromLocalStorage());
  }, [dispatch]);

  return (
    <Box p={4}>
      <Flex gap="20px">
        <Heading as="h1" mb={4}>
          {t("heading")} / {products.length}
        </Heading>
        <Flex mb={4} alignItems="center" gap="10px">
          <Text>{t("type")}:</Text>
          <Select
            onChange={handleFilterChange}
            placeholder={t("selectPlaceholder")}
            bgColor="white"
          >
            <option value="Monitors">{t("types.monitors")}</option>
            <option value="Laptops">{t("types.laptops")}</option>
            <option value="Accessories">{t("types.accessories")}</option>
          </Select>
        </Flex>
      </Flex>
      <Flex direction="column">
        <Suspense fallback={<div>{t("productsLoading")}</div>}>
          {products
            .filter(
              (product: { type: string }) => !filter || product.type === filter
            )
            .map((product: Product) => (
              <ProductItem key={product.id} product={product} />
            ))}
        </Suspense>
      </Flex>
    </Box>
  );
};

export default Products;
