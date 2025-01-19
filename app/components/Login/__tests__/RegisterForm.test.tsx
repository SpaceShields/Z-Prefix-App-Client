import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import RegisterForm from '../RegisterForm';

const validMockUser = {
    firstName: 'Alice',
    lastName: 'Smith',
    username: 'ascii123',
    password: 'password123',
}
const emptyMockUser = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
}

jest.mock('../../../actions', () => ({
    registerUser: jest.fn((previousState: any, formData: FormData) => {
        if (
            formData.get('firstName') != '' &&
            formData.get('lastName') != '' &&
            formData.get('username') != '' &&
            formData.get('password') != ''
        ) {
            return 'validUserRegister';
        } else {
            return 'invalidInput';
        }
    }),
}));

describe('Register Form', () => {
    beforeEach(() => {
        render(<RegisterForm />);
    });

    it('should render register form', () => {
        const registerForm = screen.getByTestId('register-form');
        expect(registerForm).toBeInTheDocument();
    });

    it('should render inputs', () => {
        const firstNameInput = screen.getByPlaceholderText('First Name');
        const lastNameInput = screen.getByPlaceholderText('Last Name')
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        expect(firstNameInput).toBeInTheDocument();
        expect(lastNameInput).toBeInTheDocument();
        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    });

    it('should render submit button', () => {
        const submitButton = screen.getByRole('button', { name: 'Submit' });
        expect(submitButton).toBeInTheDocument();
    });

    it('should return string and display state for successful register', async () => {
        const firstNameInput = screen.getByPlaceholderText('First Name');
        const lastNameInput = screen.getByPlaceholderText('Last Name');
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await act(async () => {
            fireEvent.change(firstNameInput, { target: { value: validMockUser.firstName } });
            fireEvent.change(lastNameInput, { target: { value: validMockUser.lastName } });
            fireEvent.change(usernameInput, { target: { value: validMockUser.username } });
            fireEvent.change(passwordInput, { target: { value: validMockUser.password } });
            fireEvent.click(submitButton);
        });

        const state = await screen.findByText('validUserRegister');
        expect(state).toBeInTheDocument();
    });

    it('should invalidate empty fields for register when submitted', async () => {
        const firstNameInput = screen.getByPlaceholderText('First Name');
        const lastNameInput = screen.getByPlaceholderText('Last Name')
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: 'Submit' });
        await act(async () => {
            fireEvent.change(firstNameInput, { target: { value: emptyMockUser.firstName } });
            fireEvent.change(lastNameInput, { target: { value: emptyMockUser.lastName } });
            fireEvent.change(usernameInput, { target: { value: emptyMockUser.username } });
            fireEvent.change(passwordInput, { target: { value: emptyMockUser.password } });
            fireEvent.click(submitButton);
        });

        expect(firstNameInput).toHaveValue('');
        expect(lastNameInput).toHaveValue('');
        expect(usernameInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');

        expect(firstNameInput).toBeInvalid();
        expect(lastNameInput).toBeInvalid();
        expect(usernameInput).toBeInvalid();
        expect(passwordInput).toBeInvalid();
    });

});