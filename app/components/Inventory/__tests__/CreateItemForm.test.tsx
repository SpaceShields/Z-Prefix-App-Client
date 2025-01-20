import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import CreateItemForm from '../CreateItemForm';

const validMockItem = {
    itemName: 'Test Item',
    description: 'This is a test item',
    quantity: 5,
}

const invalidMockItem = {
    itemName: '',
    description: 'This is a test item',
    quantity: 5,
}

const mockItemWithNoQuantity = {
    itemName: 'Test Item',
    description: 'This is a test item',
    quantity: 0,
}

jest.mock('../../../actions', () => ({
    createItem: jest.fn((previousState: any, formData: FormData) => {
        if (formData.get('itemName') === validMockItem.itemName && formData.get('description') === validMockItem.description && formData.get('quantity') === validMockItem.quantity.toString()) {
            return 'validItemCreate';
        } else if (formData.get('itemName') === invalidMockItem.itemName && formData.get('description') === invalidMockItem.description && formData.get('quantity') === invalidMockItem.quantity.toString()) {
            return 'invalidItemCreate';    
        } else if (formData.get('quantity') === mockItemWithNoQuantity.quantity.toString()) {
            return 'invalidItemCreate';
        } else {
            return 'invalidInput';
        }
    }),
}));

describe('CreateItemForm', () => {
    beforeEach(() => {
        render(<CreateItemForm />);
    });

    it('should render create item form', () => {
        const createItemForm = screen.getByTestId('create-item-form');
        expect(createItemForm).toBeInTheDocument();
    });

    it('should render inputs', () => {
        const itemNameInput = screen.getByPlaceholderText('Item Name');
        const descriptionInput = screen.getByPlaceholderText('Description');
        const quantityInput = screen.getByPlaceholderText('Quantity');
        expect(itemNameInput).toBeInTheDocument();
        expect(descriptionInput).toBeInTheDocument();
        expect(quantityInput).toBeInTheDocument();
    });

    it('should render submit button', () => {
        const submitButton = screen.getByRole('button', { name: 'Submit' });
        expect(submitButton).toBeInTheDocument();
    });

    it('should change values of inputs', async () => {
        const itemNameInput = screen.getByPlaceholderText('Item Name');
        const descriptionInput = screen.getByPlaceholderText('Description');
        const quantityInput = screen.getByPlaceholderText('Quantity');
        await act(async () => {
            fireEvent.change(itemNameInput, { target: { value: validMockItem.itemName } });
            fireEvent.change(descriptionInput, { target: { value: validMockItem.description } });
            fireEvent.change(quantityInput, { target: { value: validMockItem.quantity } });
        });

        expect(itemNameInput).toHaveValue(validMockItem.itemName);
        expect(descriptionInput).toHaveValue(validMockItem.description);
        expect(quantityInput).toHaveValue(validMockItem.quantity);
    });

    it('should keep values if bad submission and invalidate bad inputs', async () => {
        const itemNameInput = screen.getByPlaceholderText('Item Name');
        const descriptionInput = screen.getByPlaceholderText('Description');
        const quantityInput = screen.getByPlaceholderText('Quantity');
        await act(async () => {
            fireEvent.change(itemNameInput, { target: { value: invalidMockItem.itemName } });
            fireEvent.change(descriptionInput, { target: { value: invalidMockItem.description } });
            fireEvent.change(quantityInput, { target: { value: invalidMockItem.quantity } });
            fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
        });

        expect(itemNameInput).toBeInvalid();
        expect(descriptionInput).toHaveValue(invalidMockItem.description);
        expect(quantityInput).toHaveValue(invalidMockItem.quantity);
    });

    it('should return an error if quantity is 0', async () => {
        const itemNameInput = screen.getByPlaceholderText('Item Name');
        const descriptionInput = screen.getByPlaceholderText('Description');
        const quantityInput = screen.getByPlaceholderText('Quantity');
        await act(async () => {
            fireEvent.change(itemNameInput, { target: { value: mockItemWithNoQuantity.itemName } });
            fireEvent.change(descriptionInput, { target: { value: mockItemWithNoQuantity.description } });
            fireEvent.change(quantityInput, { target: { value: mockItemWithNoQuantity.quantity } });
            fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
        });

        const errorMessage = screen.getByText('invalidItemCreate');
        expect(errorMessage).toBeInTheDocument();

        expect(itemNameInput).toHaveValue(mockItemWithNoQuantity.itemName);
        expect(descriptionInput).toHaveValue(mockItemWithNoQuantity.description);       
    });
});