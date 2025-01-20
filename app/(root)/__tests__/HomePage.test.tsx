import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Home from '../page';
import React from 'react';

const mockItems = [
    {
        id: 1,
        itemName: 'Item 1',
        description: 'Description 1',
        quantity: 5,
        user: {
            id: 1,
            username: 'user1',
        },
    },
    {
        id: 2,
        itemName: 'Item 2',
        description: 'Description 2',
        quantity: 10,
        user: {
            id: 2,
            username: 'user2',
        },
    },
];

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useEffect: jest.fn(() => {
        return jest.fn();
    }),
}));

jest.mock('../../actions', () => ({
    getAllItems: jest.fn( () => Promise.resolve(mockItems) ),
}));

describe('Home Page', () => {
    beforeEach(() => {
        render(<Home initialItems={mockItems} />);
    });

    it('should render the app title', () => {
        const title = screen.getByTestId('title');
        expect(title).toBeInTheDocument();
    });

    it('should render a list of item cards by default', () => {
        const itemCardList = screen.getByTestId('items-list');

        expect(itemCardList).toBeInTheDocument();
    });

    it('should render a table when tableView is true', () => {
        expect(screen.queryByTestId('items-table')).not.toBeInTheDocument();
        const tableViewButton = screen.getByTestId('table-button');
        act(() => {
            fireEvent.click(tableViewButton);
        });
        const table = screen.getByTestId('items-table');
        expect(table).toBeInTheDocument();
    });

    it('should contain 2 item cards by default', () => {
        const itemCards = screen.getAllByTestId('item-card');
        expect(itemCards.length).toBe(2);
    });

    it('should contain 3 table items when tableView is true', async () => {
        const tableViewButton = screen.getByTestId('table-button');
        act(() => {
            fireEvent.click(tableViewButton);
        });
        const tableItems = await screen.findAllByRole('row');
        expect(tableItems.length).toBe(3);
    });
})