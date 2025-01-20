import '@testing-library/jest-dom';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import CreateItemButton from '../CreateItemButton';

describe('Create Item Button', () => {

    beforeEach(() => {
        render(<CreateItemButton />);
    });

    it('should render create item link', () => {
        const createItemButton = screen.getByRole('link', { name: 'Create Item' });
        expect(createItemButton).toBeInTheDocument();
    });
})