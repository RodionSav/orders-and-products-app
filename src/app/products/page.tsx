// src/components/Products/Products.tsx
"use client";

import { Box, Flex, Heading, Select, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";
import ProductItem from "../../components/ProductItem/ProductItem";
import { Product } from "@/types/types";

const Products: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const [filter, setFilter] = useState<string>("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  return (
    <Box p={4}>
      <Flex gap='20px'>
        <Heading as="h1" mb={4}>
          Продукты / {products.length}
        </Heading>
        <Flex mb={4} alignItems='center' gap='10px'>
          <Text>Тип:</Text>
          <Select
            onChange={handleFilterChange}
            placeholder="Выберите тип продукта"
            bgColor='white'
          >
            <option value="Monitors">Monitors</option>
            <option value="Laptops">Laptops</option>
            <option value="Accessories">Accessories</option>
          </Select>
        </Flex>
      </Flex>
      <Flex direction="column">
        {products
          .filter(
            (product: { type: string }) => !filter || product.type === filter
          )
          .map((product: Product) => (
            <ProductItem key={product.id} product={product} />
          ))}
      </Flex>
    </Box>
  );
};

export default Products;
