export interface BlogMetadata {
  readonly title: string;
  readonly tags: string[];
  readonly date: Date;
  readonly url?: string;
  readonly path: string;
  readonly description: string;
}

const blogs: BlogMetadata[] = [
  {
    date: new Date(2020, 1, 25, 11, 0, 0, 0),
    title: 'Hello World',
    path: '2020/hello-world',
    description: 'Test blog',
    tags: [
      'test',
      'hello-world',
    ],
  },
  {
    date: new Date(2020, 1, 25, 11, 0, 0, 0),
    title: 'Hello World',
    path: '2020/hello-world',
    description: 'Test blog',
    tags: [
      'test',
      'hello-world',
    ],
  },
];

export default class Blogs {
  static async getBlogs(): Promise<BlogMetadata[]> {
    const promises = blogs.map(blog => import(`./${blog.path}.md`));
    const urls = await Promise.all(promises);
    return blogs.map((blog, index) => {
      return {
        ...blog,
        url: urls[index].default,
      };
    });
  }
}
