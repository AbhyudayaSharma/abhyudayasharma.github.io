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
    description: 'Dark theme, video playback speed control and more to improve Blackboard Collaborate Ultra.',
    tags: [
      'blackboard',
      'collab',
      'ultra',
      'dark-theme',
    ],
    public: true,
  },
  {
    date: new Date(2020, 5, 21, 14, 53, 0, 0),
    title: 'My first CTF - OverTheWire Bandit',
    path: '2020/overthewire-bandit',
    description: 'My solutions to the CTF and some interesting stuff I learnt.',
    tags: [
      'ctf',
      'hacking',
      'overthewire',
      'bandit',
    ],
    public: true,
  }
].sort((a, b) => b.date.getTime() - a.date.getTime()); // reverse chronological order

export default class Blogs {
  static async getBlogs(publicOnly = true): Promise<BlogMetadata[]> {
    const blogsToReturn = publicOnly ? blogs.filter(blog => blog.public) : blogs;
    const urls = await Promise.all(blogsToReturn.map(blog => import(`./${blog.path}.md`)));
    return blogsToReturn.map((blog, index) => ({
      ...blog, url: urls[index].default,
    }));
  }
}
