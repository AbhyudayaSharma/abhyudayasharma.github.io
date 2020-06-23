/** @jest-environment jsdom-sixteen  */

import React from 'react';
import { createMemoryHistory } from 'history';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render, waitFor } from '@testing-library/react';

import fs from 'fs';
import path from 'path';

import Blog from '../Blog';
import Blogs from '../blog/Blogs';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(url => {
    // url to the file is actually not resolved in tests.
    // we only get the name of the file, for example 'foo.md'.
    // So we need to search for the file in every `year` folder.
    const blogDir = path.resolve(__dirname, '..', 'blog');
    const years = fs.readdirSync(blogDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    expect(years.length).toBeGreaterThanOrEqual(1);

    let ret: Promise<Response> | null = null;

    for (const year of years) {
      const blogPath = path.resolve(blogDir, year, url.toString());
      if (!fs.existsSync(blogPath)) continue;
      if (ret) throw new Error(`Multiple files with the same name exist: ${url}`);
      ret = Promise.resolve(new Response(fs.readFileSync(blogPath), { status: 200, statusText: 'OK' }));
    }

    if (ret) return ret;
    throw new Error(`No such file found: ${url}`);
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('Renders all blogs correctly', async () => {
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
    // rendered blogs should contain title
    await waitFor(() => expect(wrapper.getByText(blogs[i].title)).not.toBeNull());

    // the blog should have been successfully rendered
    await waitFor(() => expect(wrapper.getByRole('document')).not.toBeNull());
    await cleanup();
  }
});
