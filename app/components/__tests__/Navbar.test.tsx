import '@testing-library/jest-dom';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import Navbar from '../Navbar';
import React from 'react';

jest.mock('../../actions', () => ({
    getCookie: async () => {
        return 'validAccessToken';
    },
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useEffect: jest.fn(),
}));

describe('Navbar', () => {

    it('should show sign in button when not logged in', () => {

        render(<Navbar initialToken='' />);

        const loginButton = screen.getByRole('button', { name: 'Log in' });
        const logoutButton = screen.findAllByRole('button', { name: 'Logout' });

        expect(loginButton).toBeInTheDocument();
        expect(logoutButton).not.toBeNull();
    });

    it('should show logout, create item, and dashboard buttons when logged in', () => {

        render(<Navbar initialToken='validAccessToken' />);
        const logoutButton = screen.getByRole('button', { name: 'Logout' });
        const createItemButton = screen.getByRole('link', { name: 'Create Item' });
        const dashboardButton = screen.getByRole('link', { name: 'Dashboard' });

        expect(logoutButton).toBeInTheDocument();
        expect(createItemButton).toBeInTheDocument();
        expect(dashboardButton).toBeInTheDocument();
    });

});