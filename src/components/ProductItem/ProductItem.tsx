import React from 'react';
import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { Product } from '@/types/types';
import { FaDesktop } from 'react-icons/fa';

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { title, specification, type, guarantee, price, serialNumber, date } = product;

  const formatGuaranteeDate = (date: string) => {
    return formatDate(date);
  };

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(new Date(date));

    const [day, month, year] = formattedDate.split(' ');

    return `${day} / ${month.charAt(0).toUpperCase() + month.slice(1)} / ${year}`;
  };

  const getPrice = (priceArray: { value: number; symbol: string; isDefault: number }[]) => {
    return priceArray.map((price, index) => (
      <Box key={index}>
        <Text width="max-content">{`${price.value} ${price.symbol}`}</Text>
      </Box>
    ));
  };

  return (
    <Box display="flex" bgColor='white' borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} mb={4}>
      <Flex alignItems="center" width="100%">
        <Icon as={FaDesktop} boxSize="50px" mr={4} />
        <Flex
          display="flex"
          flex="1"
          direction="row"
          gap="15px"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Text width="max-content" fontWeight="bold">
            {title}
          </Text>
          <Text width="max-content">{type}</Text>
          <Text width='max-content'>{specification}</Text>
          <Text>{serialNumber}</Text>
          <Flex mt={2} display="flex" direction="column">
            <Text width="max-content">с {formatGuaranteeDate(guarantee.start)} </Text>
            <Text width="max-content"> по {formatGuaranteeDate(guarantee.end)}</Text>
          </Flex>
          <Flex mt={2} direction="column">
            {getPrice(price)}
          </Flex>
          <Text>{formatDate(date)}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProductItem;
