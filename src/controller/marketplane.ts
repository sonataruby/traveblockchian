import express from 'express';
import modules from '../modules/Marketplane';
const router = express.Router();

router.get('/ads', modules.getAds);
router.get('/list', modules.getRows);
router.get('/info', modules.getInfo);
router.put('/update', modules.setUpdate);
export = router;