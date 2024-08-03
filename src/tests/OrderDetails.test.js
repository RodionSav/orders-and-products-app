import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import OrderDetails from "../components/OrderDetails/OrderDetails";
import { ChakraProvider } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

jest.mock("next-intl");

describe("OrderDetails", () => {
  const order = {
    id: 1,
    title: "Order 1",
    date: "2023-08-01",
    description: "Description 1",
    products: [
      { id: 1, title: "Product 1", type: "Type 1" },
      { id: 2, title: "Product 2", type: "Type 2" },
    ],
  };

  beforeEach(() => {
    useTranslations.mockImplementation(() => (key) => key);
  });

  it("renders order details correctly", () => {
    const { getByText } = render(
      <ChakraProvider>
        <OrderDetails order={order} />
      </ChakraProvider>
    );

    expect(getByText("heading")).toBeInTheDocument();

    // Используем более гибкую проверку текста
    expect(getByText("title:")).toBeInTheDocument();
    expect(getByText("Order 1")).toBeInTheDocument();

    expect(getByText("date:")).toBeInTheDocument();
    expect(getByText("2023-08-01")).toBeInTheDocument();

    expect(getByText("description:")).toBeInTheDocument();
    expect(getByText("Description 1")).toBeInTheDocument();

    expect(getByText("products:")).toBeInTheDocument();
    expect(getByText("Product 1 (Type 1)")).toBeInTheDocument();
    expect(getByText("Product 2 (Type 2)")).toBeInTheDocument();
  });
});
