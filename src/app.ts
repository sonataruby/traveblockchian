import express, { Application, Request, Response } from "express";
import path from "path";
import http from "http";
import debug from "./config/debug";
import expressLayouts from 'express-ejs-layouts';
import ejs from 'ejs';
import bodyParser from "body-parser";
import Web3 from "web3";
import Web3Modal from "web3modal";
const app: Application = express();
const server: http.Server = http.createServer(app);
import axios, {AxiosResponse} from 'axios';

const ServiceAPI = "http://127.0.0.1:8083";
import { v4 as uuidv4 } from 'uuid';




// Setting the port
const port = debug.PORT; 

import * as jsonfile from "./data.json"
// EJS setup
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, './upload')));
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false, parameterLimit:50000}));
// Setting the root path for views directory
app.set('views', path.join(__dirname, 'views'));

// Setting the view engine
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

/* Home route */
app.get("/", async (req: Request, res: Response) => {
	
	//console.log(marketplancex);
	let ads: AxiosResponse = await axios.get(`${ServiceAPI}/ads/list`);
	let marketplace: AxiosResponse = await axios.get(`${ServiceAPI}/marketplace/ads?l=6`);
	let marketnft: AxiosResponse = await axios.get(`${ServiceAPI}/marketplace/ads?l=6`);
	res.render("index",{page : jsonfile.main, token : jsonfile.token, ads : ads.data, marketplace: marketplace.data, marketnft :  marketnft.data});
});

app.get("/mynft.html", async (req: Request, res: Response) => {
	let marketplace: AxiosResponse = await axios.get(`${ServiceAPI}/marketplace/list`);
	res.render("account/mynft",{page : jsonfile.nftmarket, token : jsonfile.token,  marketnft: marketplace.data})
});


app.get("/mynft/sell-(:id).html", async (req: Request, res: Response) => {
	let marketplace: AxiosResponse = await axios.get(`${ServiceAPI}/marketplace/list`);
	res.render("account/sellnft",{page : jsonfile.nftmarket, token : jsonfile.token,  marketnft: marketplace.data})
});


app.get("/mynft/booking-(:id).html", async (req: Request, res: Response) => {
	var id = req.params.id;
	let marketplace: AxiosResponse = await axios.get(`${ServiceAPI}/marketplace/list`);
	let hotel: AxiosResponse = await axios.get(`${ServiceAPI}/api/hotel`);
	res.render("account/booking",{page : jsonfile.nftmarket, token : jsonfile.token,  marketnft: marketplace.data, hotel : hotel.data, tokenid : id})
});


app.post("/mynft/booking-(:id).html", async (req: Request, res: Response) => {
	var id = req.params.id;

	await axios.post(`${ServiceAPI}/api/booking?id=${id}&token=${uuidv4()}`,req.body);
	res.redirect("/mynft.html");
});



app.get("/marketnft/info-(:id).html", async (req: Request, res: Response) => {
	res.render("marketnft/info",{page : jsonfile.nftmarket, token : jsonfile.token, item : {}})
});



app.get("/marketnft.html", async (req: Request, res: Response) => {
	let marketplace: AxiosResponse = await axios.get(`${ServiceAPI}/marketplace/list`);
	res.render("marketnft/home",{page : jsonfile.nftmarket, token : jsonfile.token, marketnft: marketplace.data})
});


app.get("/marketplace.html",async (req: Request, res: Response) => {
		let marketplace: AxiosResponse = await axios.get(`${ServiceAPI}/marketplace/list`);
		let ads: AxiosResponse = await axios.get(`${ServiceAPI}/ads/list`);
		res.render("marketplace/home",{page : jsonfile.nftmarket, token : jsonfile.token, marketplace: marketplace.data, ads: ads.data});
});
app.get("/marketplace/info-(:id).html", async (req: Request, res: Response) => {
	var id = req.params.id;
	let marketplace: AxiosResponse = await axios.get(`${ServiceAPI}/marketplace/info?id=${id}`);
	let ads: AxiosResponse = await axios.get(`${ServiceAPI}/ads/list`);
	res.render("marketplace/info",{page : jsonfile.nftmarket, token : jsonfile.token, item: marketplace.data, ads : ads.data})
});
app.get("/api/province/:id",async (req: Request, res: Response) => {
	var id = req.params.id;
	let info: AxiosResponse = await axios.get(`${ServiceAPI}/api/province?id=${id}`);
	res.send(info.data);
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
