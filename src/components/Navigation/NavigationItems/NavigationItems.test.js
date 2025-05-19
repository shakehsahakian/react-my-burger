import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';



describe('<NavigationItems />', () => {

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        render(<MemoryRouter><NavigationItems isAuthenticated={false} /></MemoryRouter>);
        // render(<NavigationItems isAuthenticated={false} />);

        const items = screen.getAllByRole('link');
        expect(items).toHaveLength(2);
    });
   
});




