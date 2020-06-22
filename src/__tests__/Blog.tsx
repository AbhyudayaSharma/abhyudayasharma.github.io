import React from 'react';
import Blogs from '../blog/Blogs';
import { cleanup, render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Blog from '../Blog';
import { MemoryRouter } from 'react-router-dom';

test.skip('Renders all blogs correctly', async () => {
  const blogs = await Blogs.getBlogs(false);
  for (let i = 0; i < blogs.length; i++) {
    const path = `/blog/${blogs[i].path}`;
    const split = blogs[i].path.split('/');
    const history = createMemoryHistory({ initialEntries: [path] });
    expect(split.length).toEqual(2); // should be of the form `year/path`
    const wrapper = render(
      <MemoryRouter>
        <Blog.WrappedComponent
          history={history}
          location={history.location}
          match={{
            params: { year: split[0], path: split[1] },
            path: path,
            isExact: true,
            url: `http://localhost${path}`,
          }}/>
      </MemoryRouter>
    );
    await waitFor(() => expect(wrapper.getByText(blogs[i].title)).not.toBeNull());
    await cleanup();
  }
});
