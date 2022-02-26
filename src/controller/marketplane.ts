import express from 'express';
import modules from '../modules/Marketplane';

const router = express.Router();

router.get('/ads', modules.getAds);

router.get('/list', modules.getRows);
router.get('/info', modules.getInfo);
router.post('/update',  modules.setUpdate);
//router.post('/upload', upload.single("image"));
export = router;