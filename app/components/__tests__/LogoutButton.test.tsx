import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import LogoutButton from '../LogoutButton';

jest.mock('../../actions', () => ({
    logoutUser: jest.fn(),
}));

describe('Logout Button', () => {

    beforeEach(() => {
        render(<LogoutButton />);
    });

    it('should render logout button', () => {
        const logoutButton = screen.getByRole('button', { name: 'Logout' });
        expect(logoutButton).toBeInTheDocument();
    });
})
