import '@testing-library/jest-dom';
import { formatDesc } from './formatDesc';

const longDescription = 'This is a long description that needs to be longer than 100 characters in order to test the function.';
const shortDescription = 'This is a short description.';

describe('formatDesc', () => {
    it('should format description correctly based on the number of characters', () => {
        expect(formatDesc(longDescription)).toBe(`${longDescription.substring(0, 100)}...`);
        expect(formatDesc(shortDescription)).toBe(shortDescription);
    })
});