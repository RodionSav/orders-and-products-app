import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DeleteOrderModal from '../components/DeleteModal/DeleteOrderModal';
import { ChakraProvider } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import '@testing-library/jest-dom';

jest.mock('next-intl');

describe('DeleteOrderModal', () => {
  const onClose = jest.fn();
  const onDelete = jest.fn();
  const order = { id: 1, title: 'Order 1', description: 'Description 1' };

  beforeEach(() => {
    useTranslations.mockImplementation(() => key => key);
  });

  it('renders correctly', () => {
    const { getByText } = render(
      <ChakraProvider>
        <DeleteOrderModal
          isOpen={true}
          onClose={onClose}
          onDelete={onDelete}
          order={order}
        />
      </ChakraProvider>
    );

    expect(getByText('areYouSureDelete')).toBeInTheDocument();
    expect(getByText('Order 1')).toBeInTheDocument();
    expect(getByText('Description 1')).toBeInTheDocument();
    expect(getByText('cancel')).toBeInTheDocument();
    expect(getByText('confirmDelete')).toBeInTheDocument();
  });

  it('calls onDelete when confirm button is clicked', () => {
    const { getByText } = render(
      <ChakraProvider>
        <DeleteOrderModal
          isOpen={true}
          onClose={onClose}
          onDelete={onDelete}
          order={order}
        />
      </ChakraProvider>
    );

    fireEvent.click(getByText('confirmDelete'));

    expect(onDelete).toHaveBeenCalled();
  });

  it('calls onClose when cancel button is clicked', () => {
    const { getByText } = render(
      <ChakraProvider>
        <DeleteOrderModal
          isOpen={true}
          onClose={onClose}
          onDelete={onDelete}
          order={order}
        />
      </ChakraProvider>
    );

    fireEvent.click(getByText('cancel'));

    expect(onClose).toHaveBeenCalled();
  });
});
