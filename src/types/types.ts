// types.ts

interface GuaranteePeriod {
  start: string;
  end: string;
}

interface Price {
  value: number;
  symbol: string;
  isDefault: number;
}

export interface Product {
  id: number;
  serialNumber: number;
  isNew: number;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: GuaranteePeriod;
  price: Price[];
  order: number;
  date: string;
}

export interface Order {
  id: number;
  title: string;
  date: string;
  description: string;
  products: Product[];
}
