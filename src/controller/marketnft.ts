import express from 'express';
import modules from '../modules/Marketnft';
const router = express.Router();
router.get('/ads', modules.getAds);
export = router;