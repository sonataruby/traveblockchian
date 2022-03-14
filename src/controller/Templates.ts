import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
const page = {title : "Template Manager",description : ""};
import fs from 'fs';

import modules from '../modules/Template';
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	let data = await modules.listBlock();
	res.render("template/manager",{page : page, rows : data});
});
router.get("/create", async (req: Request, res: Response, next: NextFunction) => {
	res.render("template/create",{page : page, rows : []});
});
router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
	
	await modules.createBlock(req.body);
	res.redirect('/template');
});

router.get("/update/:id", async (req: Request, res: Response, next: NextFunction) => {
	var id = Number(req.params.id);

	let data = await modules.infoBlock(id);

	res.render("template/create",{page : page, rows : data});
});
router.post("/update/:id", async (req: Request, res: Response, next: NextFunction) => {
	var id = Number(req.params.id);

	await modules.updateBlock(id,req.body);
	res.redirect('/template');
});
router.get("/delete/:id", async (req: Request, res: Response, next: NextFunction) => {
	var id = Number(req.params.id);
	await modules.deleteBlock(id);
	res.redirect('/template');
});

const replaceAll = (str: string, find: string, replace: string) => {
	return str.replace(new RegExp(find, 'g'), replace);
}

router.get("/render", async (req: Request, res: Response, next: NextFunction) => {
	let data = await modules.listBlock();
	var obj:string = "";
	
	for (let item of data) {
		obj += String(item.contents);
	}

	obj = replaceAll(obj,'&lt;','<');
	obj = replaceAll(obj,'&gt;','>');
	try {
	  fs.writeFileSync(__dirname + '/../views/home.html', obj);
	  //file written successfully
	} catch (err) {
	  console.error(err)
	}
	res.redirect('/template');
});

export = router;