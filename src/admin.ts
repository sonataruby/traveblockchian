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
//const reqSock = new Request()
//const repSock = new zmq.Reply()

const ServiceMT4 = "127.0.0.1";
const ServiceAPI = "http://127.0.0.1:8083";

const app: Application = express();

const server: http.Server = http.createServer(app);

const publicDirectoryPath = path.join(__dirname, "./public");
app.use(express.static(publicDirectoryPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.get("/ads/banner.html",async (req: Request, res: Response, next: NextFunction)=>{
	let response: AxiosResponse = await axios.get(`${ServiceAPI}/ads/listfull`);
	
	res.render("banner/manager",{page : jsonfile.main, banner:response.data})
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

server.listen(port, () => {
  console.log(`SERVER RUNNING ON ${port}`);
  
});