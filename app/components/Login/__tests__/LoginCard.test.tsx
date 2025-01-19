import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import LoginCard from '../LoginCard';

jest.mock('../../../actions', () => ({
    loginUser: jest.fn(),
}));

describe('Login Card', () => {
    beforeEach(() => {
        render(<LoginCard />);
    });

    it('should render login card', () => {
        const loginCard = screen.getByTestId('login-card');
        expect(loginCard).toBeInTheDocument();
    });

    it('should render login form', () => {
        const loginForm = screen.getByTestId('login-form');
        expect(loginForm).toBeInTheDocument();
    });

    it('should render register form and login button after click', async () => {
        const registerButton = screen.getByRole('button', { name: 'Register' });
        await act(async () => {
            fireEvent.click(registerButton);
        });
        const registerForm = screen.getByTestId('register-form');
        const loginButton = screen.getByRole('button', { name: 'Login' });
        expect(registerForm).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    });
});