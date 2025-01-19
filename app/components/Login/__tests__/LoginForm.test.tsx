import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import LoginForm from '../LoginForm';

const validMockUser = {
    username: 'alice123',
    password: 'password123',
}
const invalidMockUser = {
    username: 'invaliduser',
    password: 'invalidpassword',
}
const emptyMockUser = {
    username: '',
    password: '',
}

jest.mock('../../../actions', () => ({
    loginUser: jest.fn((previousState: any, formData: FormData) => {
        if (formData.get('username') === validMockUser.username && formData.get('password') === validMockUser.password) {
            return 'validAccessToken';
        } else if (formData.get('username') === invalidMockUser.username && formData.get('password') === invalidMockUser.password) {
            return 'invalidAccessToken';
        } else {
            return 'invalidCredentials';
        }
    }),
}));

describe('Login Form', () => {
    beforeEach(() => {
        render(<LoginForm />);
    });

    it('should render login form', () => {
        const loginForm = screen.getByTestId('login-form');
        expect(loginForm).toBeInTheDocument();
    });

    it('should render inputs', () => {
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    });

    it('should render submit button', () => {
        const submitButton = screen.getByRole('button', { name: 'Sign In' });
        expect(submitButton).toBeInTheDocument();
    });

    it('should return string and display state for successful login', async () => {
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: 'Sign In' });
        await act(async () => {
            fireEvent.change(usernameInput, { target: { value: validMockUser.username } });
            fireEvent.change(passwordInput, { target: { value: validMockUser.password } });
            fireEvent.click(submitButton);
        });

        const state = await screen.findByText('validAccessToken');
        expect(state).toBeInTheDocument();
    });

    it('should return string and display state for failed login', async () => {
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: 'Sign In' });
        await act(async () => {
            fireEvent.change(usernameInput, { target: { value: invalidMockUser.username } });
            fireEvent.change(passwordInput, { target: { value: invalidMockUser.password } });
            fireEvent.click(submitButton);
        });

        const state = await screen.findByText('invalidAccessToken');
        expect(state).toBeInTheDocument();
    });

    it('should invalidate empty fields for login when submitted', async () => {
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: 'Sign In' });
        await act(async () => {
            fireEvent.change(usernameInput, { target: { value: emptyMockUser.username } });
            fireEvent.change(passwordInput, { target: { value: emptyMockUser.password } });
            fireEvent.click(submitButton);
        });

        expect(usernameInput).toHaveValue('');
        expect(usernameInput).toBeInvalid();
        expect(passwordInput).toHaveValue('');
        expect(passwordInput).toBeInvalid();
    });

});