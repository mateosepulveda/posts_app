import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PostsController = {
  getPosts: async (req, res) => {
    try {
      const posts = await prisma.post.findMany();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  },

  createPost: async (req, res) => {
    try {
      const newPost = await prisma.post.create({
        data: req.body
      });
      res.json(newPost);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create post' });
    }
  },

  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedPost = await prisma.post.delete({
        where: {
          id: parseInt(id)
        }
      });
      res.json({ message: 'Post deleted successfully', deletedPost });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete post' });
    }
  }
};

export default PostsController;