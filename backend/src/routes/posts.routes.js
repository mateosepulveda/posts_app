import { Router } from 'express';

const router = Router();

import postsController from '../controllers/posts.controller.js';

router.get('/posts', postsController.getPosts);
router.post('/posts', postsController.createPost);
router.delete('/posts/:id', postsController.deletePost);

export default router;