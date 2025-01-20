import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import DashboardPage from '../page';
import React from 'react';

const mockItems = [
    {
        id: 1,
        itemName: 'Item 1',
        description: 'Description 1',
        quantity: 5,
    },
    {
        id: 2,
        itemName: 'Item 2',
        description: 'Description 2',
        quantity: 10,
    },
];

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useEffect: jest.fn(() => {
        return jest.fn();
    }),
}));

jest.mock('../../../actions', () => ({
    getAllItemsByUser: jest.fn( () => Promise.resolve(mockItems) ),
    getCookie: jest.fn( () => Promise.resolve('validAccessToken') ),
}));

describe('Dashboard Page', () => {
    beforeEach(() => {
        render(<DashboardPage initialItems={mockItems} />);
    });

    it('should render the dashboard title', () => {
        const title = screen.getByTestId('dashboard-title');
        expect(title).toBeInTheDocument();
    });

    it('should render a table of items', () => {
        const table = screen.getByTestId('items-table');
        expect(table).toBeInTheDocument();
    });

    it('should render items in the table', async () => {
        const itemCardList = await screen.findAllByRole('row');
        expect(itemCardList).toHaveLength(3);
    });

})