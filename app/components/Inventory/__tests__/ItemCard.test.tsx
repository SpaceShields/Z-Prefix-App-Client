import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import React, { ReactElement } from 'react';
import ItemCard from '../ItemCard';

const mockItem = {
    id: 1,
    itemName: 'Test Item',
    description: 'This is a test item',
    user : {id: 1, username: 'testuser'},
    quantity: 5,
}

const mockItemLowerQuantity = {
    id: 1,
    itemName: 'Test Item',
    description: 'This is a test item',
    user : {id: 1, username: 'testuser'},
    quantity: 1,
}

jest.mock(
    'next/link',
    () =>
        ({ children, href }: { children: ReactElement; href: string }) => (
            <a href={href}>{children}</a>
        )
);

describe('Item Card with high quantity', () => {
    beforeEach(() => {
        render(<ItemCard item={mockItem} />);
    });

    it('should render item card', () => {
        const itemCard = screen.getByTestId('item-card');
        expect(itemCard).toBeInTheDocument();
    });

    it('should render item name', () => {
        const itemName = screen.getByText('Test Item');
        expect(itemName).toBeInTheDocument();
    });

    it('should render item description', () => {
        const itemDescription = screen.getByText('This is a test item');
        expect(itemDescription).toBeInTheDocument();
    });

    it('should render item quantity', () => {
        const itemQuantity = screen.getByText('5 Left in Stock!');
        expect(itemQuantity).toBeInTheDocument();
        expect(itemQuantity).toHaveClass('text-green-500');
    });

    it('should render item user', () => {
        const itemUser = screen.getByText('@testuser');
        expect(itemUser).toBeInTheDocument();
    });

    it('should render item details button', () => {
        const itemDetailsButton = screen.getByRole('button', { name: 'Details' });
        expect(itemDetailsButton).toBeInTheDocument();
    });
});

describe('Item Card with low quantity', () => {
    beforeEach(() => {
        render(<ItemCard item={mockItemLowerQuantity} />);
    });

    it('should render item quantity', () => {
        const itemQuantity = screen.getByText('1 Left in Stock!');
        expect(itemQuantity).toBeInTheDocument();
        expect(itemQuantity).toHaveClass('text-[#F02D3A]');
    });
});