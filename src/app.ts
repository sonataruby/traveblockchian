import express, { Application, Request, Response } from "express";
import path from "path";
import http from "http";
import debug from "./config/debug";
import expressLayouts from 'express-ejs-layouts';
import ejs from 'ejs';
const app: Application = express();
const server: http.Server = http.createServer(app);
import { getRows as ads} from './modules/Ads';
import { getRows as marketplance} from './modules/Marketplane';
import { getRows as marketnft} from './modules/Marketnft';

const publicDirectoryPath = path.join(__dirname, "./public");
app.use(express.static(publicDirectoryPath));

// Setting the port
const port = debug.PORT;

import * as jsonfile from "./data.json"
// EJS setup
app.use(expressLayouts);

// Setting the root path for views directory
app.set('views', path.join(__dirname, 'views'));

// Setting the view engine
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

/* Home route */
app.get("/", async (req: Request, res: Response) => {
	let adsx = await ads(); 
	let marketplancex = await marketplance(6); 
	let marketnftx = await marketnft(); 
	//console.log(marketplancex);
	res.render("index",{page : jsonfile.main, token : jsonfile.token, ads : adsx, marketplance: marketplancex, marketnftx :  marketnft});
});

app.get("/nftmarket/info/:id", (req: Request, res: Response) => {
	res.render("nftmarket_info",{page : jsonfile.nftmarket, token : jsonfile.token})
});

app.get("/nftmarket/buynow/:id", (req: Request, res: Response) => {
	res.render("nftmarket_buynow",{page : jsonfile.nftmarket, token : jsonfile.token})
});

app.get("/plancemarket/info/:id", (req: Request, res: Response) => {
	res.render("plancemarket_info",{page : jsonfile.nftmarket, token : jsonfile.token})
});

app.get("/plancemarket/buynow/:id", (req: Request, res: Response) => {
	res.render("plancemarket_buynow",{page : jsonfile.nftmarket, token : jsonfile.token})
});
/*
app.get("/presell", (req: Request, res: Response) => {
	res.render("presell")
});



app.get("/gameplay", (req: Request, res: Response) => {
	res.render("index")
});
*/

server.listen(port, () => {
  console.log(`SERVER RUNNING ON ${port}`);
});
