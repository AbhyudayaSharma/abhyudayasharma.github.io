import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import BlogList from '../BlogList';

it('renders without crashing', async () => {
  render(
    <MemoryRouter>
      <BlogList/>
    </MemoryRouter>
  );
});
