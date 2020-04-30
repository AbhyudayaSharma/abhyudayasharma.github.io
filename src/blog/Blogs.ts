interface IncompleteBlogMetadata {
  readonly title: string;
  readonly tags: string[];
  readonly date: Date;
  readonly path: string;
  readonly public: boolean;
  readonly description: string;
}

export interface BlogMetadata extends IncompleteBlogMetadata {
  readonly url: string;
}

// NOTE: months in the date constructor start from 0
/**
 * Blogs sorted in reverse chronological order.
 */
const blogs: readonly IncompleteBlogMetadata[] = [
  {
    date: new Date(2020, 1, 7, 12, 45, 0, 0),
    title: 'Hello World',
    path: '2020/hello-world',
    description: 'This my first blog. Hello world!👋',
    tags: [
      'hello',
      'world',
      'hello-world',
    ],
    public: true,
  },
  {
    date: new Date(2020, 3, 13, 15, 47, 0, 0),
    title: 'A better experience for BlackBoard Collaborate Ultra',
    path: '2020/bbcollab',
    description: 'A better experience for BlackBoard Collaborate Ultra',
    tags: [
      'blackboard',
      'collab',
      'ultra',
      'dark-theme',
    ],
    public: true,
  },
].sort((a: IncompleteBlogMetadata, b: IncompleteBlogMetadata) => b.date.getTime() - a.date.getTime()); // reverse chronological order

export default class Blogs {
  static async getBlogs(publicOnly = true): Promise<BlogMetadata[]> {
    const blogsToReturn = publicOnly ? blogs.filter(blog => blog.public) : blogs;
    const urls = await Promise.all(blogsToReturn.map(blog => import(`./${blog.path}.md`)));
    return blogsToReturn.map((blog, index) => {
      return {
        ...blog,
        url: urls[index].default,
      };
    });
  }
}
