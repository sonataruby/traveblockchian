import express, { Application, Request, Response } from "express";
import path from "path";
import http from "http";
import fs from "fs";
import helmet from "helmet";
import cors from "cors";
import morgan from 'morgan';
import bodyParser from "body-parser";
//import { connect } from './database';

import axios, {AxiosResponse} from 'axios';
import posts from './controller/Posts';
import ads from './controller/ads';
import marketplace from './controller/marketplane';
import marketnft from './controller/marketnft';
import api from './controller/api';
const app: Application = express();

const server: http.Server = http.createServer(app);
app.use('/upload', express.static('./upload'));
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false, parameterLimit:50000}));
app.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});


// Setting the port
const port = 8083;

app.get("/", (req: Request, res: Response) => {
	res.status(200).json({
        message: "Conbo"
    });
});
app.use("/posts", posts);
app.use("/marketplace", marketplace);
app.use("/ads", ads);
app.use("/marketnft", marketnft);
app.use("/api", api);


/** Error handling */
app.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});


server.listen(port, () => {
  console.log(`SERVER RUNNING ON ${port}`);
  
});