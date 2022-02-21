import express from 'express';
import modules from '../modules/Ads';
const router = express.Router();

router.get('/list', modules.getAds);
router.post('/update', modules.updateAds);
router.delete('/delete/:id', modules.deleteAds);
router.post('/onoff/:id', modules.onOffAds);
router.get('/listfull', modules.getAdsFull);
router.get('/info', modules.getAdsInfo);
export = router;