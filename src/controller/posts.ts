import express from 'express';
import modules from '../modules/Posts';
const router = express.Router();

router.get('/list', modules.getPosts);
router.get('/info/:id', modules.getPost);
router.put('/update/:id', modules.updatePost);
router.delete('/delete/:id', modules.deletePost);
router.post('/add', modules.addPost);

export = router;