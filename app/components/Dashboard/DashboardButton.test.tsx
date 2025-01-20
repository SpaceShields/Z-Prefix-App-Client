import '@testing-library/jest-dom';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import DashboardButton from './DashboardButton';

describe('Dashboard Button', () => {

    beforeEach(() => {
        render(<DashboardButton />);
    });

    it('should render dashboard link', () => {
        const dashboardButton = screen.getByRole('link', { name: 'Dashboard' });
        expect(dashboardButton).toBeInTheDocument();
    });
})