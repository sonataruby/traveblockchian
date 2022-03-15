import express, { Application, Request, Response, NextFunction} from "express";
import path from "path";
import http from "http";
import fs from "fs";
import debug from "./config/debug";
import expressLayouts from 'express-ejs-layouts';
import ejs from 'ejs';

import bodyParser from "body-parser";
import { connect } from './database';
//import { getRunOrders, getFinishOrders, createOrders, closeOrders, deleteOrders, getSymbol, getAllSymbol, updateSymbolTrendParent , updateSymbolTrendChild} from './modules/Orders';
import net from 'net';
const client = new net.Socket();
import * as jsonfile from "./data.json"
import axios, {AxiosResponse} from 'axios';
import template from './controller/Templates';
import { v4 as uuidv4 } from 'uuid';
//const reqSock = new Request()
//const repSock = new zmq.Reply()

const ServiceMT4 = "127.0.0.1";
const ServiceAPI = "http://127.0.0.1:8083";

const app: Application = express();

const server: http.Server = http.createServer(app);


app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, './upload')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false, parameterLimit:50000}));

import multer from 'multer';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/upload')
  },
  filename: function (req, file, cb) {
  	let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now() + '.'+extension)
  }
})
 
var upload = multer({ storage: storage })


app.use(upload.single('image'));

// Setting the port
const port = 8084;


// EJS setup
app.use(expressLayouts);

// Setting the root path for views directory
app.set('views', path.join(__dirname, 'admin'));

// Setting the view engine
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');


/* Home route */
app.get("/", (req: Request, res: Response) => {
	res.render("index",{page : jsonfile.main})
});
app.use("/template",template);

/*Banner Manager*/
app.get("/ads/banner.html",async (req: Request, res: Response, next: NextFunction)=>{
	let response: AxiosResponse = await axios.get(`${ServiceAPI}/ads/listfull`);
	
	res.render("banner/manager",{page : jsonfile.main, banner:response.data})
});
app.get("/ads/banner-edit-(:id).html",async (req: Request, res: Response, next: NextFunction)=>{
	let id = req.params.id;
	let response: AxiosResponse = await axios.get(`${ServiceAPI}/ads/info?id=${id}`);
	
	res.render("banner/banner-edit",{page : jsonfile.main, item:response.data})
});
app.post("/ads/banner-edit-(:id).html",async (req: Request, res: Response, next: NextFunction)=>{
	let id = req.params.id;
	if(req.file){
		req.body.banner = "/"+req.file.filename;
	}
	let response: AxiosResponse = await axios.post(`${ServiceAPI}/ads/update?id=${id}`,req.body);
	res.redirect("/ads/banner.html");
});

/*Market Manager*/
app.get("/marketplace/manager.html",async (req: Request, res: Response, next: NextFunction)=>{
	let response: AxiosResponse = await axios.get(`${ServiceAPI}/marketplace/list?l=50`);
	res.render("marketplace/manager",{page : jsonfile.main, marketplace:response.data})
});

app.post("/marketplace/manager.html",async (req: Request, res: Response, next: NextFunction)=>{
		res.redirect("/marketplace/manager.html");
});

app.put("/marketplace/manager.html",async (req: Request, res: Response, next: NextFunction)=>{
	res.redirect("/marketplace/manager.html");
});

app.delete("/marketplace/manager.html",async (req: Request, res: Response, next: NextFunction)=>{
	res.redirect("/marketplace/manager.html");
});


app.get("/marketplace/item-edit-(:id).html",async (req: Request, res: Response, next: NextFunction)=>{
	let id = req.params.id;
	let response: AxiosResponse = await axios.get(`${ServiceAPI}/marketplace/info?id=${id}`);
	if(response.data.prikeys == "" || response.data.prikeys == "undefined") response.data.prikeys = uuidv4();
	res.render("marketplace/edit",{page : jsonfile.main, item:response.data})
});

app.get("/marketplace/settings",async (req: Request, res: Response, next: NextFunction)=>{
	res.render("marketplace/settings",{page : jsonfile.main})
});

app.post("/marketplace/item-edit-(:id).html",async (req: Request, res: Response, next: NextFunction)=>{
	let id = req.params.id;
	if(req.file){
		req.body.banner = "/"+req.file.filename;
	}
	let response: AxiosResponse = await axios.post(`${ServiceAPI}/marketplace/update?id=${id}`,req.body);
	res.redirect("/marketplace/manager.html");
});

app.get("/marketplace/item-delete-(:id).html",async (req: Request, res: Response, next: NextFunction)=>{
	let response: AxiosResponse = await axios.get(`${ServiceAPI}/marketplace/list?l=50`);
	res.redirect("/marketplace/manager.html");
});

app.get('/marketplace/sync-(:id).html',async function(req: Request, res: Response, next: NextFunction){
	var id = req.params.id;
	let response: AxiosResponse = await axios.get(`${ServiceAPI}/marketplace/info?id=${id}`);
	var obj = {
		item_id : response.data.item_id,
		price : response.data.price,
		star : response.data.star,
		night : response.data.night,
		bed : response.data.bed,
		nam : response.data.name,
		code : response.data.prikeys == "undefined" || response.data.prikeys == "" ? uuidv4() : response.data.prikeys,
		chuky : response.data.chuky,
		exitmoiky : response.data.exitmoiky,
		qty : response.data.qty
	};
	return res.status(200).send(obj);
});


/*Booking Contrller*/
app.get("/booking/location.html",async (req: Request, res: Response, next: NextFunction)=>{
	let response: AxiosResponse = await axios.get(`${ServiceAPI}/api/hotel?l=50`);
	res.render("travel/manager",{page : jsonfile.main, hotel:response.data})
});


app.get("/booking/signals.html",async (req: Request, res: Response, next: NextFunction)=>{
	let response: AxiosResponse = await axios.get(`${ServiceAPI}/api/booking`);
	res.render("travel/booking",{page : jsonfile.main, data:response.data})
});

app.get("/booking/provinceedit-(:id).html",async (req: Request, res: Response, next: NextFunction)=>{
	var id = req.params.id;
	let response: AxiosResponse = await axios.get(`${ServiceAPI}/api/province?id=${id}`);
	res.render("travel/editter",{page : jsonfile.main, info:response.data})
});

server.listen(port, () => {
  console.log(`SERVER RUNNING ON ${port}`);
  
});