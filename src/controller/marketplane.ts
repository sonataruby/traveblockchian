import express, {Application, Request, Response, NextFunction } from 'express';
import modules from '../modules/Marketplane';

const router = express.Router();

router.get('/ads', modules.getAds);

router.get('/list', modules.getRows);
router.get('/info', modules.getInfo);
router.post('/update',  modules.setUpdate);
router.get("/sync/:id",async (req: Request, res: Response, next: NextFunction)=>{
	var id = Number(req.params.id);
	await modules.setSync(id);
	return res.status(200).json({status : "ok"});
});

router.get("/setads/:id",async (req: Request, res: Response, next: NextFunction)=>{
	var id = Number(req.params.id);
	await modules.setAds(id);
	return res.status(200).json({status : "ok"});
});


//router.post('/upload', upload.single("image"));
export = router;